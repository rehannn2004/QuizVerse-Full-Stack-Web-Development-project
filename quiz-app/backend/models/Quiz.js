const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Please add a question text'],
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (options) {
        return options.length === 4;
      },
      message: 'There must be exactly 4 options',
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

const QuizSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    enum: ['Math', 'Science', 'History'],
  },
  questions: {
    type: [QuestionSchema],
    validate: {
      validator: function (questions) {
        return questions.length === 5;
      },
      message: 'There must be exactly 5 questions',
    },
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);