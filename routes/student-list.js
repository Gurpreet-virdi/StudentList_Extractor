const express = require('express');
const studentController = require('../controllers/student');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/', isAuth, studentController.getUserDetails);

module.exports = router;