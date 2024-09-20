const express = require('express');
const {createUser,signInUser,signOutUser} = require('../controllers/loginController.js')

const router = express.Router();

router.post('/signup',createUser);

router.post('/signin',signInUser);

router.post('/signout',signOutUser)

module.exports = router;