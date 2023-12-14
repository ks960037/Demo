import mongoose from 'mongoose'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const Schema = mongoose.Schema
const config = useRuntimeConfig()

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    account: {
        type: String,
        unique: true,
        require: true,
    },

    password: {
        type: String,
        required: true,
        max: 100,
    },

    GLOBE: {
        type: Number,
        default: 1,
    },

    SMART: {
        type: Number,
        default: 1,
    },

    DITO: {
        type: Number,
        default: 1,
    },

    CHERRY: {
        type: Number,
        default: 1,
    },

    OTHER: {
        type: Number,
        default: 1,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    resetPasswordToken: {
        type: String,
        required: false,
    },

    resetPasswordExpires: {
        type: Date,
        required: false,
    },
    superuser: {
        type: Number,
        default: 0,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    credits: {
        type: Number,
        default: 0,
    },
    messages: {
        type: Number,
        default: 0,
    },
    count: {
        type: Number,
        default: 0,
    },
    channelPrices: {
        type: Map,
    },
});

UserSchema.pre('save', function (next: any) {
    const user = this;

    if (!user.isModified('password')) return next()

    console.log('modified password')
    console.log(user.password)

    bcrypt.hash(user.password, 10, function (err: any, hash: any) {
        if (err) return next(err)

        user.password = hash
        next()
    })
})

UserSchema.methods.updatePassword = async function (rawPassword: any) {
    const user = this

    if (!rawPassword.length) {
        return
    }

    /*
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hash(rawPassword, salt)
    console.log(hash)
    */

    user.password = rawPassword
    await user.save()
}

UserSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.generateJWT = function () {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    let payload = {
        id: this._id,
        email: this.email,
        name: this.name,
    }

    return jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    })
}

UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordExpires = Date.now() + 3600000 //expires in an hour
}

export const User = mongoose.model("User", UserSchema);