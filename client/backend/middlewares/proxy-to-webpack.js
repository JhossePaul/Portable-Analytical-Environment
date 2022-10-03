const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();


/**
 * Development proxy
 */
const proxyToWebpack = (app, host) => {
  app.all([
    '/',
    '*.json', '*.js',
    '*.jpg', '*.png',
    '*.woff*', '*.ttf', '*.svg'
  ], (req, res) => {
    proxy.web(req, res, {
      target: 'http://' + host + ':3001'
    });
  });
};

/**
 * Development proxy logger
 */
proxy.on('error', (error) => {
  console.error('Could not connect to proxy, please try again', error);
});

module.exports = proxyToWebpack;
