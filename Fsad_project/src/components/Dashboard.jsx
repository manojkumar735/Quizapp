import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ userEmail }) => {
  const navigate = useNavigate();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const createQuizBtnRef = React.useRef();

  const defaultQuizzes = [
    {
      id: 1,
      title: "ECLECTIC QUIZ",
      description: "Test your trivia skills with this eclectic quiz that covers a wide range of topics. From science to pop culture, history to geography, challenge yourself to answer these 10 random questions. Good luck!",
      createdBy: "lokendra@gmail.com",
      questions: 10
    },
    {
      id: 2,
      title: "NODE.JS QUIZ",
      description: "Test your knowledge of Node.js, a popular runtime environment for executing JavaScript code on the server side. This quiz will challenge your understanding of Node.js concepts, modules, and best practices. Good luck!",
      createdBy: "lokendra@gmail.com",
      questions: 5
    },
    {
      id: 3,
      title: "JAVASCRIPT QUIZ",
      description: "Test your knowledge of JavaScript, one of the most widely used programming languages for web development. This quiz covers a range of JavaScript topics, from basics to advanced concepts. How well do you know JavaScript? Let's find out!",
      createdBy: "menu@gmail.com",
      questions: 2
    }
  ];

  useEffect(() => {
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
    setAllQuizzes([...defaultQuizzes, ...customQuizzes]);
  }, []);

  const handleCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const handleTakeQuiz = (quizId) => {
    navigate(`/take-quiz/${quizId}`);
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleDeleteQuiz = (quizId) => {
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
    const updated = customQuizzes.filter(q => String(q.id) !== String(quizId));
    localStorage.setItem('customQuizzes', JSON.stringify(updated));
    setAllQuizzes(prev => prev.filter(q => String(q.id) !== String(quizId)));
  };

  const handleEditQuiz = (quizId) => {
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
    const quiz = customQuizzes.find(q => String(q.id) === String(quizId));
    if (quiz) {
      const updated = customQuizzes.filter(q => String(q.id) !== String(quizId));
      localStorage.setItem('customQuizzes', JSON.stringify(updated));
      setAllQuizzes(prev => prev.filter(q => String(q.id) !== String(quizId)));
      navigate('/create-quiz', { state: { quizToEdit: quiz } });
    } else if (createQuizBtnRef.current) {
      createQuizBtnRef.current.click();
    }
    setDropdownOpen(null);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          Welcome 👋 {userEmail}
          <Link to="/logout" className="logout-btn">Logout</Link>
        </div>
      </header>

      <div className="dashboard-content">
        {userEmail === '2300031457@kluniversity.in' && (
          <div className="create-quiz-container">
            <button ref={createQuizBtnRef} className="create-quiz-btn" onClick={handleCreateQuiz}>
              Create Quiz
            </button>
          </div>
        )}

        <div className="quizzes-grid">
          {allQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>{quiz.title}</h2>
                {userEmail === '2300031457@kluniversity.in' && (
                  <div style={{ position: 'relative' }}>
                    <button
                      style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '0 8px' }}
                      onClick={() => setDropdownOpen(dropdownOpen === quiz.id ? null : quiz.id)}
                    >
                      ...
                    </button>
                    {dropdownOpen === quiz.id && (
                      <div style={{ position: 'absolute', top: '32px', right: 0, background: '#fff', border: '1px solid #ccc', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', zIndex: 10, display: 'flex', flexDirection: 'column', minWidth: '100px' }}>
                        <button style={{ padding: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left' }} onClick={() => handleEditQuiz(quiz.id)}>Edit</button>
                        <button style={{ padding: '10px', border: 'none', background: 'none', cursor: 'pointer', color: 'red', textAlign: 'left' }} onClick={() => handleDeleteQuiz(quiz.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="quiz-description">{quiz.description}</p>
              <div className="quiz-meta">
                <p>Created By : {quiz.createdBy}</p>
                <p>Questions : {quiz.questions}</p>
              </div>
              <div className="quiz-actions">
                <button 
                  className="take-quiz-btn"
                  onClick={() => handleTakeQuiz(quiz.id)}
                >
                  Take Quiz
                </button>
                <button className="leaderboard-btn" onClick={handleLeaderboard}>
                  Leaderboard
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 