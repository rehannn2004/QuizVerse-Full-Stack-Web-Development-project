const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/:subject').get(protect, getLeaderboard);

module.exports = router;