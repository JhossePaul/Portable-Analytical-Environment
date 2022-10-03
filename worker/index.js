#!/usr/bin/env node

const open = require('amqplib').connect('amqp://queue');
const rio = require('rio');

open.then((connection) => {
  return connection.createChannel();
}).then((channel) => {
  const q = 'queue';

  channel.prefetch(1);
  channel.assertQueue(q, { durable: false }).then((ok) => {
    console.log(' [x] Awaiting RPC requests');

    channel.consume(q, (msg) => {
      const n = parseInt(msg.content.toString());

      console.log(' [.] rnorm(%d)', n);
      rio.$e({
        filename: './R/worker.R',
        entrypoint: 'output',
        data: { n: n },
      }).then((response) => {
        channel.sendToQueue(
          msg.properties.replyTo,
          new Buffer(JSON.stringify(response)),
          {correlationId: msg.properties.correlationId}
        );
        channel.ack(msg);
      }).catch(console.error);
    });
  });
}).catch(console.error);

