const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    groups: [new mongoose.Schema({
        groupName: {
            type: String,
            required: true,
            unique: true,
            minlength: 4,
            maxlength: 32,
            trim: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    })]
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        username: Joi.string().min(3).max(32).required().trim(),
        email: Joi.string().required().email(),
        password: Joi.string().min(10).max(255).required(),
        groups: Joi.array().min(0).items(Joi.objectId())
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;