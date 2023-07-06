const { Router } = require('express');

const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller')

const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidations,
    getOneRequestValidations,
    deleteOneRequestValidations
} = require('../middlewares/users/index')

const router = Router();

router.get('/', getAllRequestValidations, getAllUsers);
router.post('/', postRequestValidations, createUser);
router.get('/:id', getOneRequestValidations, getUser);
router.put('/:id', putRequestValidations, updateUser);
router.delete('/:id', deleteOneRequestValidations, deleteUser);

module.exports = router