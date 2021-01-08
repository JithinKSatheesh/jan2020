const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const crypto = require('crypto')
const uuidv1 = require('uuidv1');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        trim: true
    },
    dp: {
        type: String,
    },
    salt: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    // history: {
    //     type: Array,
    //     default: []
    // },
    posts:{
        type:ObjectId,
        ref:'Posts', 
    },
    favourites:{
        type:ObjectId,
        ref:'Posts', 
    },
}, { timestamps: true })


// virtual schema

userSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    }
}

module.exports = mongoose.model('User', userSchema)