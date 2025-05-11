import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './QuizPlayer.css';

const QuizPlayer = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Mock quiz data - replace with actual API call
  useEffect(() => {
    // Simulating an API call to fetch quiz data
    const fetchQuizData = () => {
      // This is mock data - replace with actual API call
      const mockQuizzes = {
        1: {
          title: "people",
          description: "about ethiopian people",
          totalScore: 20,
          questions: [
            {
              id: 1,
              question: "Who was the last emperor of Ethiopia before its monarchy was abolished?",
              options: [
                "Menelik II",
                "Haile Selassie",
                "Tewodros II",
                "Abebe Bikila"
              ],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "What is the capital of Ethiopia?",
              options: [
                "Nairobi",
                "Addis Ababa",
                "Asmara",
                "Djibouti"
              ],
              correctAnswer: 1
            },
            {
              id: 3,
              question: "Which planet is known as the Red Planet?",
              options: [
                "Venus",
                "Mars",
                "Jupiter",
                "Saturn"
              ],
              correctAnswer: 1
            },
            {
              id: 4,
              question: "Who wrote the play 'Romeo and Juliet'?",
              options: [
                "William Shakespeare",
                "Charles Dickens",
                "Jane Austen",
                "Mark Twain"
              ],
              correctAnswer: 0
            },
            {
              id: 5,
              question: "What is the largest mammal in the world?",
              options: [
                "African Elephant",
                "Blue Whale",
                "Giraffe",
                "Hippopotamus"
              ],
              correctAnswer: 1
            },
            {
              id: 6,
              question: "Which element has the chemical symbol 'O'?",
              options: [
                "Gold",
                "Oxygen",
                "Osmium",
                "Oxide"
              ],
              correctAnswer: 1
            },
            {
              id: 7,
              question: "In which year did the first man land on the moon?",
              options: [
                "1965",
                "1969",
                "1972",
                "1959"
              ],
              correctAnswer: 1
            }
          ]
        },
        2: {
          title: "NODE.JS QUIZ",
          description: "Test your knowledge of Node.js, a popular runtime environment for executing JavaScript code on the server side. This quiz will challenge your understanding of Node.js concepts, modules, and best practices. Good luck!",
          totalScore: 5,
          questions: [
            {
              id: 1,
              question: "Which command is used to initialize a new Node.js project?",
              options: ["npm start", "npm init", "node init", "npm install"],
              correctAnswer: 1
            },
            {
              id: 2,
              question: "Which of the following is a core module in Node.js?",
              options: ["express", "http", "mongoose", "nodemon"],
              correctAnswer: 1
            },
            {
              id: 3,
              question: "What does the 'fs' module in Node.js stand for?",
              options: ["File System", "Fast Server", "File Service", "Function Service"],
              correctAnswer: 0
            },
            {
              id: 4,
              question: "Which method is used to read a file asynchronously in Node.js?",
              options: ["fs.readFileSync", "fs.readFile", "fs.openFile", "fs.getFile"],
              correctAnswer: 1
            },
            {
              id: 5,
              question: "Which object is used to handle events in Node.js?",
              options: ["EventEmitter", "EventHandler", "EventObject", "EventLoop"],
              correctAnswer: 0
            }
          ]
        },
        3: {
          title: "JAVASCRIPT QUIZ",
          description: "Test your knowledge of JavaScript, one of the most widely used programming languages for web development. This quiz covers a range of JavaScript topics, from basics to advanced concepts. How well do you know JavaScript? Let's find out!",
          totalScore: 5,
          questions: [
            {
              id: 1,
              question: "Which keyword is used to declare a variable in JavaScript?",
              options: ["var", "let", "const", "All of the above"],
              correctAnswer: 3
            },
            {
              id: 2,
              question: "What is the output of: console.log(typeof null)?",
              options: ["object", "null", "undefined", "number"],
              correctAnswer: 0
            },
            {
              id: 3,
              question: "Which method is used to parse a JSON string into a JavaScript object?",
              options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "stringify.JSON()"],
              correctAnswer: 0
            },
            {
              id: 4,
              question: "Which symbol is used for single-line comments in JavaScript?",
              options: ["//", "/*", "<!--", "#"],
              correctAnswer: 0
            },
            {
              id: 5,
              question: "Which array method returns the first element that satisfies a condition?",
              options: ["find()", "filter()", "map()", "forEach()"],
              correctAnswer: 0
            }
          ]
        }
      };

      // Try to find a custom quiz in localStorage
      const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
      const customQuiz = customQuizzes.find(q => String(q.id) === String(quizId));
      if (customQuiz) {
        setQuizData({
          title: customQuiz.title,
          description: customQuiz.description,
          totalScore: customQuiz.questions,
          questions: customQuiz.questionsData
        });
        return;
      }

      const quiz = mockQuizzes[quizId];
      if (quiz) {
        setQuizData(quiz);
      } else {
        navigate('/dashboard');
      }
    };

    fetchQuizData();
  }, [quizId, navigate]);

  // Timer effect
  useEffect(() => {
    if (!isFinished && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isFinished) {
      setIsFinished(true);
      navigate('/quiz-results', {
        state: {
          score: score,
          totalQuestions: quizData.questions.length,
          quizTitle: quizData.title
        }
      });
    }
  }, [timer, isFinished, score, quizData, navigate]);

  const handleOptionSelect = (index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = index;
    setSelectedOptions(updatedOptions);
    setHasAnswered(true);
    setSelectedOption(index);
    if (index === quizData.questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleQuestionNav = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(selectedOptions[index] !== undefined ? selectedOptions[index] : null);
    setHasAnswered(selectedOptions[index] !== undefined);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      navigate('/quiz-results', {
        state: {
          score: score,
          totalQuestions: quizData.questions.length,
          quizTitle: quizData.title
        }
      });
    }
  };

  const getOptionClassName = (index) => {
    if (!hasAnswered) {
      return `option ${selectedOption === index ? 'selected' : ''}`;
    }
    
    if (index === quizData.questions[currentQuestionIndex].correctAnswer) {
      return 'option correct';
    }
    
    if (selectedOption === index) {
      return 'option wrong';
    }
    
    return 'option';
  };

  if (!quizData) {
    return <div className="quiz-player-container">Loading...</div>;
  }

  return (
    <div className="quiz-player-container">
      <div className="quiz-warning">
        <p className="warning-text">--- You can attemp Quiz as many time as you want but the score will only be calculated for the first attemp. ---</p>
        <p className="warning-text warning-refresh">--- Please do not refresh your page ---</p>
      </div>

      <div className="quiz-content-row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '32px' }}>
        <div className="quiz-content" style={{ flex: 1 }}>
          <div className="quiz-header">
            <div className="quiz-title">
              <h2>Quiz Title : <span className="title-text">{quizData.title}</span></h2>
            </div>
            <div className="quiz-score">
              <h2>Total Score : {score}/{quizData.questions.length}</h2>
            </div>
            <div className="quiz-timer">
              <h2 style={{ color: timer < 540 ? 'red' : '#333' }}>
                Time Left : {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}
              </h2>
            </div>
          </div>

          <div className="quiz-description">
            <p>Quiz Description : {quizData.description}</p>
          </div>

          {!isFinished && (
            <>
              <div className="question-container">
                <h3 className="question-text">
                  Q : {currentQuestionIndex + 1} {'>>'} {quizData.questions[currentQuestionIndex].question}
                </h3>
                <div className="options-container">
                  <p className="options-label">Options :-</p>
                  {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                    <div
                      key={index}
                      className={getOptionClassName(index)}
                      onClick={() => handleOptionSelect(index)}
                      style={{
                        background: selectedOptions[currentQuestionIndex] === index ? '#d1c4e9' : '',
                      }}
                    >
                      {index + 1}. {option}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="next-button"
                onClick={handleNext}
                disabled={!hasAnswered}
              >
                {currentQuestionIndex === quizData.questions.length - 1 ? 'Finish' : 'NEXT'}
              </button>
            </>
          )}
        </div>
        <div className="quiz-navigation-panel" style={{ minWidth: '180px', background: '#f5f5f5', padding: '18px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#333', fontSize: '18px' }}>Quiz navigation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
            {quizData.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionNav(idx)}
                style={{
                  width: '100%',
                  height: '38px',
                  background: idx === currentQuestionIndex ? '#007bff' : selectedOptions[idx] !== undefined ? '#b2dfdb' : '#e0e0e0',
                  color: idx === currentQuestionIndex ? 'white' : '#333',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  outline: 'none',
                  fontSize: '16px',
                }}
              >
                {`Q${idx + 1}`}
              </button>
            ))}
          </div>
          <button
            className="finish-attempt-btn"
            style={{
              marginTop: '30px',
              width: '100%',
              padding: '12px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
            }}
            onClick={() => {
              setIsFinished(true);
              navigate('/quiz-results', {
                state: {
                  score: score,
                  totalQuestions: quizData.questions.length,
                  quizTitle: quizData.title
                }
              });
            }}
            disabled={isFinished}
          >
            Finish Attempt
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer; 