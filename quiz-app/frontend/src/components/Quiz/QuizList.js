import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from '../../services/quizService';
import '../../styles/quiz.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div className="loading">Loading quizzes...</div>;
  }

  return (
    <div className="quiz-list-container">
      <h2>Select a Subject</h2>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h3>{quiz.subject}</h3>
            <Link to={`/quiz/${quiz._id}`} className="quiz-button">
              Start Quiz
            </Link>
            <Link
              to={`/leaderboard/${quiz.subject}`}
              className="leaderboard-link"
            >
              View Leaderboard
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;