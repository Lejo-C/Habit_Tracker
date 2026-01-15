const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username avatar level');
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                level: user.level,
                xp: user.xp,
                bounty: user.bounty,
                streak: user.streak,
                friends: user.friends,
                isVerified: user.isVerified
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.username = req.body.username || user.username;
            user.avatar = req.body.avatar || user.avatar;
            // Handle password change separately or here if needed

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                token: generateToken(updatedUser._id) // Optional: refresh token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a friend
// @route   POST /api/users/friends/:id
// @access  Private
const addFriend = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(req.params.id);

        if (!friend) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.friends.includes(req.params.id)) {
            return res.status(400).json({ message: 'User is already a friend' });
        }

        user.friends.push(req.params.id);
        await user.save();

        // Optionally add this user to friend's list (mutual)
        // friend.friends.push(user._id);
        // await friend.save();

        res.json({ message: 'Friend added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, updateUserProfile, addFriend };
