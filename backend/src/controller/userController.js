const argon2 = require('argon2')
const UserModel = require('../models/userModel')
const response = require('../utils/response')


exports.signup = async (req, res) => {
    try {
        // Obtendo dados corpo da requisição
        const { name, email, password } = req.body

        const existUser = await UserModel.findOne({ email }) // Searching for the user based on their email
        if (existUser) throw new Error('Email já cadastrado')

        const user = new UserModel({ name, email, password }) // Instanciando usuário   
        await user.generateToken() // getting a token for the user instance

        await user.save()  // Salvando usuário na base de dados 

        // const safeUser = user.toJSON() // Here i had to use explicitly toJSON to adjust the response

        // Respondendo requisição
        return res.status(200).json(response(true, 200, 'Cadastro criado com sucesso', user))

    } catch (error) {
        return res.status(404).json(response(false, 404, error.message))
    }
}


exports.login = async (req, res) => {
    try {
        const user = await UserModel.findByCredentials(req.body)
        await user.generateToken()
        res.status(200).json(response(true, 200, 'You have logged in successfully', user))
    } catch (error) {
        res.status(404).json(response(false, 404, error.message))
    }
}

// Controller para obter dados do usuário
exports.getMyProfile = async (req, res) => {
    try {
        const { id } = req.user
        const user = await UserModel.findById(id)

        if (!user) throw new Error('User not found')

        // const safeUser = user.toJSON()

        res.status(200).json(response(true, 200, 'Usuários obtidos com sucesso', user))
    } catch (error) {
        res.status(500).json(response(false, 500, error.message))
    }
}


exports.updateMyProfile = async (req, res) => {

    const userFields = Object.keys(req.body)
    const userModelFiels = ['name', 'email', 'password']

    const isUserField = userFields.every(field => userModelFiels.includes(field))

    if (!isUserField) {
        return res.status(404).json(response(false, 404, 'Fields'))
    }

    try {
        const user = req.user
        userFields.forEach(field => user[field] = req.body[field])
        await user.save()

        res.status(200).json(response(true, 200, 'User Profile updated successfully'))
    } catch (error) {
        res.status(500).json(response(false, 500, error.message))
    }
}


exports.deleteMyAccount = async (req, res) => {
    try {
        const { id } = req.user

        const user = await UserModel.findByIdAndDelete(id)

        res.status(200).json(response(true, 200, 'User account has been deleted successfully', user))
    } catch (error) {
        res.status(500).json(response(false, 500, error.message))
    }
}


exports.logout = async (req, res) => {
    try {
        const { id } = req.user
        const token = req.token

        const user = await UserModel.findById(id)
        if (!user || !token) throw new Error('User not found or token has not sent')

        user.tokens = user.tokens.filter((t) => t.token !== token)
        await user.save()

        res.send({
            "success": true,
            "message": "You’ve been logged out. Have a great day!",
            "redirect": "/login"
        })
    } catch (error) {
        res.status(500).json(response(true, 500, error.message))
    }
}

exports.logoutAll = async (req, res) => {
    try {
        const { id } = req.user
        const token = req.token

        const user = await UserModel.findById(id)
        if (!user || !token) throw new Error('User not found or token has not sent')

        user.tokens = []
        await user.save()

        res.send()
    } catch (error) {
        res.status(500).json(response(false, 500, error.message))
    }
}
