const express = require('express');
const {
  getQuizzes,
  getQuiz,
  submitQuiz,
} = require('../controllers/quizController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(protect, getQuizzes);
router.route('/:id').get(protect, getQuiz);
router.route('/:id/submit').post(protect, submitQuiz);

module.exports = router;