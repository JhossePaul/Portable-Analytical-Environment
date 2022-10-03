'use strict'

/**
 * Packages
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

/**
 * Server components
 */
const routes = require('./routes');
const middlewares = require('./middlewares')

/**
 * Server constants
 */
const isProduction = process.env.NODE_ENV === 'production';
const host = process.env.APP_HOST || '0.0.0.0';
const port = isProduction ? 80 : 3000;
const publicPath = path.resolve(__dirname, '..', 'public');

/**
 * Server configuration
 */
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/api', router);

/**
 * Proxied routes from Webpack dev server live bundling
 */
if (!isProduction) middlewares.proxyToWebpack(app, host, port);

/**
 * Registering endpoints
 */
routes.home(app);
routes.tables(router);
routes.rnorm(router);


/**;
 * Server/Proxy launch
 */
const server = app.listen(port, host, (error) => {
  if (error) console.error('Could not initialize express', error);
  else console.info('==> Magic happens on port %s:%s', host, port);
});
