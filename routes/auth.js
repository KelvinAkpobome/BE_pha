const express = require('express');

const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.registerAgent);
router.post('/login', auth.loginAgent);

module.exports = router;
