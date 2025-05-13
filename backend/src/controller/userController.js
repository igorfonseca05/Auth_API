const argon2 = require('argon2')

const userModel = require('../models/userModel')

const response = require('../utils/response')


exports.getUser = async (req, res) => {
    console.log(req.body)

    res.end()
}


exports.signup = async (req, res) => {
    try {
        // Obtendo dados corpo da requisição
        const { name, email, password } = req.body

        console.log(req.ip)

        // Buscando usuário da base de dados por email
        const existUser = await userModel.findOne({ email })
        if (existUser) {
            throw new Error('Email já cadastrado')
        }

        // Instanciando usuário   
        const user = new userModel({ name, email, password })
        await user.generateToken()

        // Salvando usuário na base de dados 
        await user.save()

        // Respondendo requisição
        return res.status(200).json(response(true, 200, 'Cadastro criado com sucesso', user._doc))

    } catch (error) {
        return res.status(404).json(response(false, 401, error.message))
    }
}