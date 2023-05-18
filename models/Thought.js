const { Schema, model } = require('mongoose');

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
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            // array of nested documents created with the reactionSchema
        }
    },
    {
        toJSON: {
          virtuals: true,
        },
      },
);
// create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query 
const Thought = model('thought', thoughtSchema);

module.exports = Thought;