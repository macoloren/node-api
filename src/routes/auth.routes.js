const { Router } = require('express');
const { login } = require('../controllers/auth.controller')
const { postLoginRequestValidations } = require('../middlewares/auth/index')

const router = Router();

router.post('/login', postLoginRequestValidations, login);



module.exports = router