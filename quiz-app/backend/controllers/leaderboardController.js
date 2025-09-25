const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

// @desc    Get leaderboard for a subject
// @route   GET /api/leaderboard/:subject
// @access  Private
exports.getLeaderboard = asyncHandler(async (req, res, next) => {
  // Find the quiz for the subject
  const quiz = await Quiz.findOne({ subject: req.params.subject });

  if (!quiz) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  const leaderboard = await Result.aggregate([
    { $match: { quiz: quiz._id } },
    {
      $group: {
        _id: "$user",
        maxScore: { $max: "$score" },
        latestAttempt: { $last: "$createdAt" },
        attempts: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        name: '$user.name',
        usn: '$user.usn',
        score: '$maxScore',
        attempts: 1,
        latestAttempt: 1
      }
    },
    { $sort: { score: -1, latestAttempt: 1 } }
  ]);

  res.status(200).json({
    success: true,
    data: leaderboard,
  });
});