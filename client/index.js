const nodemon = require('nodemon');
const path = require('path');
const bundle = require('./config/bundler');
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  bundle();
}

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'backend/server'),
  ignore: [],
  watch: !isProduction ? ['backend/*'] : false,
  ext: 'js'
}).on('restart', function() {
  console.log('Backend restarted!');
});
