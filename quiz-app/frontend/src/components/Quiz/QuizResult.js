import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../../styles/quiz.css';

const QuizResult = () => {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) {
    return (
      <div className="quiz-result">
        <h2>No result found</h2>
        <Link to="/" className="quiz-button">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="quiz-result">
      <h2>Quiz Completed!</h2>
      <div className="result-score">
        You scored {result.score} out of {result.totalQuestions}
      </div>
      <div className="result-percentage">
        {Math.round((result.score / result.totalQuestions) * 100)}%
      </div>
      <div className="result-actions">
        <Link to="/" className="quiz-button">
          Back to Quizzes
        </Link>
        <Link to="/chat" className="quiz-button">
          Discuss Doubts
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;