const Router    = require('koa-router');
const passport  = require('auth/middlewares/passport');
const users     = require('./controllers/users');

const router    = new Router();
const apiRouter = new Router({ prefix: '/api/v1' });

apiRouter.get('/users/:id', passport.authenticate('jwt', {session: false}), users.getById);
apiRouter.get('/users',     passport.authenticate('jwt', {session: false}), users.getAll);

module.exports = [
    router,
    apiRouter
];
