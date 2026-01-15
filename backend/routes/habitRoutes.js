const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    logHabit
} = require('../controllers/habitController');

router.route('/')
    .get(protect, getHabits)
    .post(protect, createHabit);

router.route('/:id')
    .put(protect, updateHabit)
    .delete(protect, deleteHabit);

router.post('/:id/log', protect, logHabit);

module.exports = router;
