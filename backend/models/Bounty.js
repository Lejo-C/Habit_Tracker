const mongoose = require('mongoose');

const bountySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['earned', 'spent', 'penalty'],
        required: true
    },
    reason: {
        type: String, // e.g., "Completed Habit: Gym", "Missed Habit"
        required: true
    },
    relatedHabit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }
}, { timestamps: true });

module.exports = mongoose.model('BountyTransaction', bountySchema);
