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
    putRequestValidations 
} = require('../middlewares/users/index')

const router = Router();

router.get('/', getAllUsers);
router.post('/', postRequestValidations, createUser);
router.get('/:id', getUser);
router.put('/:id', putRequestValidations, updateUser);
router.delete('/:id', deleteUser);

module.exports = router