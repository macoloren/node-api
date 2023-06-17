const express = require('express');

const getAllUsers = (req, res) => {
    throw new Error("eroor al obtener los usuarios")
    res.send("hola users")
}

const createUser = (req, res) => {
    res.send("create user")
}

const getUser = (req, res) => {
    res.send("one user")
}

const updateUser = (req, res) => {
    res.send("update user")
}

const deleteUser = (req, res) => {
    res.send("delete user")

}


module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}