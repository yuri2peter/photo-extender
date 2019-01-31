const Router = require('koa-router');

module.exports = function (app) {
  const router = new Router();

  router.get('/blank', (ctx, next) => {
    ctx.body = ''
  });

  router.post('/test', (ctx, next) => {
    ctx.body = {
      error: null,
      data: 'server is running.'
    }
  });

  app.use(router.routes()).use(router.allowedMethods());
};

