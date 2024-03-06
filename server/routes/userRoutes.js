const {createUser, verifyUser, loginUser} = require('../controllers/userController')
const express = require('express')
const router  = express.Router()

router.post('/register', createUser)
router.get('/verify/:_id/:token', verifyUser)

router.post('/login',loginUser)

module.exports = router