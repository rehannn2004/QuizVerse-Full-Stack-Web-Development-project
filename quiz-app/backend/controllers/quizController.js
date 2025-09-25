const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all quizzes
// @route   GET /api/quiz
// @access  Private
exports.getQuizzes = asyncHandler(async (req, res, next) => {
  const quizzes = await Quiz.find().select('subject');

  res.status(200).json({
    success: true,
    data: quizzes,
  });
});

// @desc    Get single quiz
// @route   GET /api/quiz/:id
// @access  Private
exports.getQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    return next(
      new ErrorResponse(`Quiz not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: quiz,
  });
});

// @desc    Submit quiz answers
// @route   POST /api/quiz/:id/submit
// @access  Private
exports.submitQuiz = asyncHandler(async (req, res, next) => {
  // Validate input
  if (!req.body.answers || !Array.isArray(req.body.answers)) {
    return next(new ErrorResponse('Please provide an answers array', 400));
  }

  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    return next(new ErrorResponse(`Quiz not found with id of ${req.params.id}`, 404));
  }

  // Validate answers length matches questions
  if (req.body.answers.length !== quiz.questions.length) {
    return next(new ErrorResponse(
      `Expected ${quiz.questions.length} answers, got ${req.body.answers.length}`,
      400
    ));
  }

  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (req.body.answers[index] === question.correctAnswer) {
      score++;
    }
  });

  // Save result
  await Result.create({
    user: req.user.id,
    quiz: req.params.id,
    score,
    answers: req.body.answers
  });

  res.status(200).json({
    success: true,
    score,
    totalQuestions: quiz.questions.length,
    quizId: quiz._id
  });
});