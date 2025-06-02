const argon2 = require('argon2')
const UserModel = require('../models/userModel')
const response = require('../utils/response')



exports.getUsers = async (req, res) => {
    try {

        const users = await UserModel.find()

        if (!users) {
            throw new Error('Error to get users')
        }

        res.status(200).json(response(true, 200, 'Usuários obtidos com sucesso', [...users]))

    } catch (error) {
        res.status(404).json(response(true, 404, error.message))
    }
}


exports.getUser = async (req, res) => {
    try {

        const id = req.params.id

        const user = await UserModel.findById(id)
        if (!user) throw new Error('User not found')

        res.status(200).json(response(true, 200, 'Obtained user', user))
    } catch (error) {
        res.status(404).json(response(false, 404, error.message))
    }
}


exports.signup = async (req, res) => {
    try {
        // Obtendo dados corpo da requisição
        const { name, email, password } = req.body

        // Buscando usuário da base de dados por email
        const existUser = await UserModel.findOne({ email })
        if (existUser) {
            throw new Error('Email já cadastrado')
        }

        // Instanciando usuário   
        const user = new UserModel({ name, email, password })
        await user.generateToken()

        // Salvando usuário na base de dados 
        await user.save()

        // Respondendo requisição
        return res.status(200).json(response(true, 200, 'Cadastro criado com sucesso', user._doc))

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


exports.logout = async () => {
    try {

    } catch (error) {

    }
}


