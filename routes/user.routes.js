const express = require('express');
const router = express.Router();
const { findMe, findAll } = require('../controllers/user.controller');
const { protect, restrictTo } = require('../controllers/auth.controller');

router.route('/me').get(protect, findMe);

router.route('/').get(restrictTo('admin'), findAll);

module.exports = router;
