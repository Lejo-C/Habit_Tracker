const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    verifyOTP,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);

module.exports = router;
