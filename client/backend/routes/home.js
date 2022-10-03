/**
 * Default endpoint
 */
const home = (app) => {
  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });
};

module.exports = home;
