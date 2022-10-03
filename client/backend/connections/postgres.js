const pg = require('pg');
const Pool = require('pg-pool');

const user = process.env.POSTGRES_USER || 'user';
const password = process.env.POSTGRES_PASSWORD || 'pass';
const database = process.env.POSTGRES_DB || 'default';
const host = process.env.NODE_ENV === 'production' ?
  'db' : '192.168.99.100';


const pool = new Pool({
  user,
  password,
  database,
  host: host,
  port: 5432,
  max: 10,
  min: 5,
  idleTimeoutMillis: 1000
});

const query = (text, values, callback) => {
  console.log('Query: ', text, callback);
  return pool.query(text, values, callback);
};

const connect = (callback) => {
  return pool.connect(callback);

};

pool.on('error', (error, client) => {
  console.error('Idle client error', err.message, err.stack);
});

module.exports = {pool, query, connect};
