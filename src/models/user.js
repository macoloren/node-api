const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50,"Name is very long"],
        minlength: [3, "Name is a very short"]
    },
    lastName: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        maxlength: [50,"Last name is very long"],
        minlength: [3, "Last name is a very short"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    // password_confirmation: {
    //     type: String,
    //     required: [true, 'Password confirmation is required'],
    //     trim: true,
    // },
    date: {
        type: Date
    },
    role: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
        default: 'USER_ROLE'
    },
    enable: {
        type: Boolean,
        required: true,
        default: true
    },
},
    {
        timestamps: true,
        version: false
    });

    //validando que el email sea unico
    userSchema.plugin(uniqueValidator, { message: 'already exist in the Data Base' });

    //paginacion para listar la DB
    userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', userSchema);