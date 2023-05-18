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
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
              }
            // add unique and must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts:{
            type: Schema.Types.ObjectId,
            reference: 'Thought'},
            //array of _id values referencing the Thought model
        
        friends: {
            type: Schema.Types.ObjectId,
            reference: 'User'},
    },
    {
        toJSON: {
          virtuals: true,
        },
      },
);

const User = model('user', userSchema);

module.exports = User;