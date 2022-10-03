const postgres = require('../connections').postgres;

const tablesGetController = (req, res) => {
  postgres.pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE';
  `, (error, tables) => {
    if (error) console.error(error);
    else res.json(tables);
  });
};

const tables = (router) => {
  router.route('/tables')
    .get(tablesGetController);
};

module.exports = tables;
