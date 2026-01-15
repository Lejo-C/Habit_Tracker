const Habit = require('../models/Habit');
const User = require('../models/User');

// @desc    Get all habits for logged in user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res) => {
    const { title, type, scheduling, reward, description } = req.body;

    try {
        const habit = await Habit.create({
            user: req.user.id,
            title,
            type,
            description,
            schedule: scheduling, // Use proper field name matching model
            reward: reward || { xp: 10, bounty: 5 }
        });
        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Check user
        if (habit.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHabit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        if (habit.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await habit.deleteOne();
        res.json({ message: 'Habit removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Log a habit completion (Gamification core)
// @route   POST /api/habits/:id/log
// @access  Private
const logHabit = async (req, res) => {
    const { date, completed, durationLogged, notes } = req.body;

    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });

        if (habit.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        // Add log
        habit.logs.push({
            date: date || new Date(),
            completed,
            durationLogged,
            notes
        });

        // Gamification Logic
        if (completed) {
            habit.streak += 1;

            const user = await User.findById(req.user.id);

            // Add Rewards
            user.xp += habit.reward.xp;
            user.bounty += habit.reward.bounty;
            user.streak += 1; // Global streak logic can be more complex

            // Level Up Logic (Simple: Level = sqrt(XP/100))
            const newLevel = Math.floor(Math.sqrt(user.xp / 100)) + 1;
            if (newLevel > user.level) {
                user.level = newLevel;
                // Add bonus bounty for leveling up
                user.bounty += 50 * newLevel;
            }

            await user.save();
        } else {
            // Handle 'undone' or failure -> streak reset?
            // For now, if explicitly marked uncompleted, reset streak
            habit.streak = 0;
        }

        await habit.save();

        res.json({ habit, message: completed ? 'Habit logged! Rewards added.' : 'Habit updated.' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    logHabit
};
