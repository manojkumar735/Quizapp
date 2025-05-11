import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuizResults.css';

const QuizResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions, quizTitle } = location.state || {};

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="results-container">
      <div className="results-content">
        <h1 className="results-title">Quiz Results</h1>
        <h2 className="quiz-name">{quizTitle}</h2>
        <div className="score-display">
          <div className="score-circle">
            <span className="score-text">{score}</span>
            <span className="total-text">/{totalQuestions}</span>
          </div>
          <p className="score-label">Your Score</p>
        </div>
        <button className="back-button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QuizResults; 