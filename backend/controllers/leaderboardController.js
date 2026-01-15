const User = require('../models/User');

// @desc    Get Weekly Leaderboard
// @route   GET /api/leaderboard
// @access  Private
const getLeaderboard = async (req, res) => {
    try {
        // Simple logic: Top users by Level (or XP)
        // Ideally, for "Weekly", we would need a separate collection tracking weekly XP,
        // or filter logs. For this MVP, we return Global Top Users.

        const topUsers = await User.find({})
            .sort({ xp: -1 })
            .limit(10)
            .select('username avatar level xp streak bounty');

        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLeaderboard };
