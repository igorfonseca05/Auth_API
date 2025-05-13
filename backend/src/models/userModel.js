const { argon2d, argon2id } = require('argon2')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const argon2 = require('argon2')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})


userSchema.methods.generateToken = async function () {
    const user = this

    const token = jwt.sign({ id: user.id }, process.env.JTW_SECRET, { expiresIn: '7d' })

    if (user.tokens.length > 4) {
        user?.tokens?.shift()
    }

    user.tokens?.push({ token })

    await user.save()

    return token
}


userSchema.pre('save', async function (next) {
    const user = this

    if (!user.isModified("password")) return next()

    try {
        user.password = await argon2.hash(user.password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 5,
            parallelism: 1
        })

        next()
    } catch (error) {
        next(error)
    }
})


const useModel = mongoose.model('userModel', userSchema)

module.exports = useModel