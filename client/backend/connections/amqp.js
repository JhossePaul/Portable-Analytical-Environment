const host = process.env.NODE_ENV === 'production' ?
  'queue' :
  '196.168.99.100';
const amqp = require('amqplib').connect('amqp://192.168.99.100');

module.exports = amqp;
