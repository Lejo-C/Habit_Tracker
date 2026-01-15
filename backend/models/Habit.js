const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['checklist', 'done_undone', 'duration'],
        required: true
    },
    description: String,
    schedule: {
        // Days of week: 0=Sun, 1=Mon, etc.
        days: [{ type: Number }], // e.g., [1, 3, 5] for Mon, Wed, Fri
        startTime: String, // "08:00"
        durationMinutes: Number // For duration type
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    reward: {
        xp: { type: Number, default: 10 },
        bounty: { type: Number, default: 5 }
    },
    streak: { type: Number, default: 0 },
    logs: [{
        date: { type: Date, default: Date.now },
        completed: Boolean,
        durationLogged: Number, // Minutes
        notes: String
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
