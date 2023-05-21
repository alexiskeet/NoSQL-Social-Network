const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            // add unique and trimmed
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/],
            // add unique and must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts:{
            type: Schema.Types.ObjectId,
            reference: 'Thought'},
            //array of _id values referencing the Thought model
        
        friends: [
            {
            type: Schema.Types.ObjectId,
            reference: 'User'
    },
]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// create a virtual called friendCount that retireves the length of the user's friends arrray field on query
const User = model('user', userSchema);

module.exports = User;