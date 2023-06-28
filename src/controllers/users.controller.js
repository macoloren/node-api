const express = require('express');
const userService = require('../services/user.Service')
const Success = require('../handlers/successHandler');


const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.findAll(req.query.filter, req.query.options);
        res.status(200).json(new Success(users))
    } catch (error) {
        next(error);
    }
};

//funcion para poner nombres con inicial mayuscula 
function initialUppercase(data) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

const createUser = async (req, res, next) => {
    try {
        let user = req.body;

        user.name = initialUppercase(user.name);
        user.lastName = initialUppercase(user.lastName);

        user = await userService.save(user);

        res.status(201).json(new Success(user));
    } catch (error) {
        next(error)
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.findById(id);
        res.status(200).json(new Success(user));
    } catch (error) {
        next(error)
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        let user = req.body;
        user._id = id

        const userUpdated = await userService.update(id, user)
        res.status(200).json(new Success(userUpdated))
    } catch (error) {
        next(error)
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await userService.remove(id)

        res.status(200).json(new Success(user));
    } catch (error) {
        next(error)
    }

};


module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
};