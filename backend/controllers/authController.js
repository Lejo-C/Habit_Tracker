const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../utils/otpGenerator');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Session timeout can be handled here or shorter
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        const user = await User.create({
            username,
            email,
            password,
            otp: {
                code: otp,
                expiresAt: otpExpires
            }
        });

        // Send OTP Email
        const message = `Your confirmation code is: <b>${otp}</b>. It expires in 10 minutes.`;
        try {
            await sendEmail({
                email: user.email,
                subject: 'Habit Tracker - Verify your account',
                message
            });
        } catch (err) {
            console.error("Failed to send OTP email", err);
            // Optionally delete user if email fails, or allow resend.
        }

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: 'Registration successful. Please verify OTP sent to your email.'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        if (user.otp.code === otp && user.otp.expiresAt > Date.now()) {
            user.isVerified = true;
            user.otp = undefined; // Clear OTP

            // Generate token implicitly for auto-login or ask to login
            const token = generateToken(user._id);
            user.sessionToken = token; // Set session for single device
            await user.save();

            res.clearCookie('token'); // Clear any old cookies

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token,
                message: 'Account verified successfully'
            });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (!user.isVerified) {
                // Optionally resend OTP here
                return res.status(401).json({ message: 'Account not verified. Please verify your email.' });
            }

            const token = generateToken(user._id);

            // Single device login enforcement: Update sessionToken
            user.sessionToken = token;
            user.lastLogin = Date.now();
            await user.save();

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash and set to resetPasswordToken
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins

        await user.save();

        const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`; // In real app, frontend URL
        const message = `You have requested a password reset. Please go to this link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message
            });
            res.json({ message: 'Email sent' });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ message: 'Email could not be sent' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset Password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        // Invalidate current session on password change
        user.sessionToken = undefined;

        await user.save();

        res.json({ message: 'Password updated success' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    verifyOTP,
    loginUser,
    forgotPassword,
    resetPassword
};
