const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: /*(value) => {
                    validator.isEmail(value);
                },*/
                validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
    
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]

});

// instance methods

// hide infos like password, tokens array
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;    // NO with arrow function(need to bind this(instance of user))
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // user.tokens.push({
    //     access,
    //     token
    // });
    // use this line instead because of mongo inconsistencies
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() =>{
        return token;
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};
