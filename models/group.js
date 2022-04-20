const Joi = require('joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    amountSaved: {
        type: Number,
        default: 0,
        min: 0
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    }
});

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 32,
        trim: true
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 255
    },
    admin: {
        type: userSchema,
        required: true
    },
    isSearcheable: {
        type: Boolean,
        default: true
    },
    saveRate: {
        type: Number,
        required: true,
        min: 1
    },
    maxCapacity: {
        type: Number,
        default: Infinity,
        min: 2
    },
    members: [memberSchema],
    tenureTable: [userSchema]
});

const Group = mongoose.model('Group', groupSchema);

function validateGroup(group) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(32).required().trim(),
        description: Joi.string().min(1).max(255),
        isSearcheable: Joi.boolean(),
        saveRate: Joi.number().integer().min(1).required(),
        maxCapacity: Joi.number().integer().min(2),
    });

    return schema.validate(group);
}

exports.Group = Group;
exports.validate = validateGroup;
