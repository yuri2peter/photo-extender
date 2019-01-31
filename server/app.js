const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const cors = require('@koa/cors');
const uuid = require('uuid');
const router = require('./router');

module.exports = async function server (preferPort = 80) {
  const appId = uuid.v1();
  const port = await require('get-port')({ port: preferPort });
  const app = new Koa();
  app.use(cors()); // Enable cors with default options
  router(app); // koa-router
  app.use(koaStatic(
    path.join( __dirname, './front')
  ));
  return new Promise(resolve => {
    app.listen(port, () => {
      const home = `http://127.0.0.1:${port}`;
      const blank = `${home}/blank`;
      resolve({
        port,
        home,
        blank,
        appId,
      })
    });
  });
};
