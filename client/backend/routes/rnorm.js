/**
 * Test API endpoint that returns random normal numbers
 */
const uuid = require('uuid');
const amqp = require('../connections').amqp;

const rnormPostController = (req, res) => {
  amqp.then((connection) => {
    return connection.createChannel();
  }).then((channel) => {
    channel.assertQueue('', {exclusive: true}).then((q) => {
      const num = 5;
      const correlationId = uuid.v4();

      channel.sendToQueue(
        'queue',

        new Buffer(num.toString()),
        {correlationId, replyTo: q.queue}
      );

      channel.consume(q.queue, (msg) => {
        if (msg.properties.correlationId === correlationId) {
          res.json(msg.content.toString());
        }
      }, { noAck: true });
    });
  });
};

const rnorm = (router) => {
  router.route('/rnorm').post(rnormPostController);
};

module.exports = rnorm;
