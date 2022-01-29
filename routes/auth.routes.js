const express = require('express');
const router = express.Router();

const { signIn } = require('../controllers/auth.controller');

const { create } = require('../controllers/user.controller');

router.route('/sign-in/').post(signIn);

router.route('/sign-up/').post(create);

module.exports = router;
