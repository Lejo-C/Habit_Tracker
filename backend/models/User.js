const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '' // URL to avatar
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        code: String,
        expiresAt: Date
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lastLogin: {
        type: Date,
        default: Date.now
    },
    // Gamification Stats
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    bounty: { type: Number, default: 0 }, // Coins
    streak: { type: Number, default: 0 },

    // Friends
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Single Session Token
    sessionToken: String, // To invalidate old sessions

}, { timestamps: true });

// Encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
