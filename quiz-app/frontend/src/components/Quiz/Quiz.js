import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getQuiz, submitQuizAnswers } from '../../services/quizService';
import '../../styles/quiz.css';

const Quiz = () => {
  const { id } = useParams();
  const history = useHistory();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuiz(id);
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null));
      } catch (err) {
        setError('Failed to load quiz');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate answers before submission
      if (!answers || !Array.isArray(answers) || answers.some(a => a === null)) {
        throw new Error('Please answer all questions before submitting');
      }

      const result = await submitQuizAnswers(id, answers);
      
      if (!result || typeof result.score === 'undefined') {
        throw new Error('Invalid response from server');
      }

      history.push({
        pathname: `/result/${id}`,
        state: { 
          result: {
            score: result.score,
            totalQuestions: result.totalQuestions,
            quizId: id
          }
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to submit quiz');
      console.error('Submission error:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!quiz) {
    return <div className="error">Quiz not found</div>;
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2>{quiz.subject} Quiz</h2>
      <div className="quiz-progress">
        Question {currentQuestion + 1} of {quiz.questions.length}
      </div>
      <div className="quiz-question">
        <h3>{question.questionText}</h3>
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`quiz-option ${
                answers[currentQuestion] === index ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="quiz-navigation">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
          className="quiz-nav-button"
        >
          Previous
        </button>
        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            disabled={answers[currentQuestion] === null}
            className="quiz-nav-button"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answers.some((answer) => answer === null)}
            className="quiz-submit-button"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;