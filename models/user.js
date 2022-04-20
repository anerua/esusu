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
        maxlength: 64,
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
        maxlength: 1024
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