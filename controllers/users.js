const User = require('../models/user');

exports.getById = async ctx => {
    const user = await User.findOne({ _id: String(ctx.params.id) }).lean().exec();

    if (!user) return ctx.throw(404);

    ctx.type = 'json';
    ctx.body = user;
};

exports.getAll = async ctx => {
    const users = await User.find().lean().exec();

    ctx.type = 'json';
    ctx.body = users;
};
