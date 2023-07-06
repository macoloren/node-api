const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userService = require('../services/user.Service')
const AppError = require('../errors/appError')
const config = require('../config/index')

//Methodo Login 
const login = async (email, password) => {
    try {
        //validacion de email
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new AppError('Authentication failed Email/Password does not correct', 401)
        }

        //validacion de usuario habilitado
        if (!user.enable) {
            throw new AppError('Authentication failed! User disabled ', 401)
        }

        //validacion de password
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            throw new AppError('Authentication failed Email/Password does not correct', 401)
        }

        //generar JWT
        const token = _encrypt(user._id)

        return {
            token,
            user: user.name,
            role: user.role
        }

    } catch (error) {
        throw error;
    }
};

//logica para el uso de token, accediendo a las propiedades que trae el token para retornar en usuario
const validToken = async (token) => {
    // let id;
    try {
        //validar que token sea integro(valido)
        const obj = jwt.verify(token, config.auth.secret)
        id = obj.id
    } catch (verifyError) {
        throw new AppError('Authentication failed, invalid Token', 401)
    }


    try {
        //validar si existe usuario por medio de id en la DB
        const user = await userService.findById(id)
        if (!user) {
            throw new AppError('Authentication failed Token User not foud', 401)
        }
        //validar i el usuario recuperado esta habilitado
        if (!user.enable) {
            throw new AppError('Authentication failed! User disabled', 401)
        }
        //retornar el usuario
        return user;
    } catch (error) {
        throw error
    }
};

//validando tipo de rol que tiene el usuario
const validRole = (user, ...roles) => {
    if (!roles.includes(user.role)) {
        throw new AppError('Authorization failed! User whitout privileges', 403)
    }
    return true;
}

_encrypt = (id) => {
    return jwt.sign({
        id
    }, config.auth.secret, { expiresIn: config.auth.ttl });
}

module.exports = {
    login,
    validToken,
    validRole
}