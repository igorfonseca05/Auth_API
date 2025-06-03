const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const UserModel = require('../models/userModel')

/**
 * This middleware is responsible for validating the token sent by the user
 * at the moment of the request. The validation flow starts by extracting the
 * token value from the request header and using the `verify` method to compare
 * it with the application's secret token, checking for any inconsistencies.
 * 
 * After verification, we use the decoded payload from the user's token to search
 * for their data in the database. If no user data is found, an error is thrown
 * indicating that. Otherwise, if a valid user is found, we attach their data to
 * the `req` object so that it can be accessed within protected routes.
 */

async function validateToken(req, res, next) {

    try {
        const token = req.headers.authorization?.replace('Bearer', '').trim()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findOne({ id: decoded.id, 'tokens.token': token })
        if (!user) throw new Error('User not found')

        req.token = token
        req.user = user

        next()
    } catch (error) {
        res.status(401).json(response(false, 401, error.message))
    }
}

module.exports = validateToken

