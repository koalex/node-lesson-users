const Router    = require('koa-router');
const passport  = require('../auth/middlewares/passport');
const users     = require('./controllers/users');

const router    = new Router();
const apiRouter = new Router({ prefix: '/api/v1' });

router.get('/users',        passport.authenticate('jwt', {session: false}), users.renderUsersPage);
apiRouter.get('/users/:id', passport.authenticate('jwt', {session: false}), users.getById);
apiRouter.get('/users',     passport.authenticate('jwt', {session: false}), users.getAll);
apiRouter.del('/users/:id', passport.authenticate('jwt', {session: false}), users.deleteOne);

module.exports = [
    router,
    apiRouter
];
