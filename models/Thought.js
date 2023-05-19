const { Schema, model } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use a getter method to format the timestamp on query
            get: () => moment(this.createdAt).format('YYYY-MM-DD:mm:ss'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false
      },
);
// reaction Schema
const reactionSchema = new Schema(
{
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    }, 
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: () => moment(this.createdAt).format('YYYY-MM-DD:mm:ss'),
    }
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


// create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query 
const Thought = model('thought', thoughtSchema);

module.exports = Thought;