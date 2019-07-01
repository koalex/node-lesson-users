const User = require('../models/user');
const Message = require('../../messages/models/message');
const mongoose = require('../../../lib/mongoose');
const fs = require('fs');

exports.renderUsersPage = async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(require.resolve('../../../static/users.html'));
};

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

exports.deleteOne = async ctx => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction({
            readConcern: { level: 'snapshot' },
            writeConcern: { w: 'majority' }
        });

        await User.findByIdAndRemove(String(ctx.params.id)).session(session);

        await Message.deleteMany({user_id: String(ctx.params.id)}).session(session);

        await session.commitTransaction();

        await session.endSession();
    } catch (err) {
        await session.abortTransaction();

        return ctx.throw(500, err.message);
    }

    ctx.status = 200;
};
