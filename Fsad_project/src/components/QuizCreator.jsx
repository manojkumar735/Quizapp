import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuizCreator.css';

const QuizCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctOptions: [false, false, false, false]
      }
    ]
  });

  // Prefill for edit
  React.useEffect(() => {
    if (location.state && location.state.quizToEdit) {
      setQuizData({
        title: location.state.quizToEdit.title || '',
        description: location.state.quizToEdit.description || '',
        questions: location.state.quizToEdit.questionsData || [
          {
            question: '',
            options: ['', '', '', ''],
            correctOptions: [false, false, false, false]
          }
        ]
      });
      setCurrentQuestionIndex(0);
    }
  }, [location.state]);

  const handleQuizDataChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (e) => {
    const { value } = e.target;
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === currentQuestionIndex ? { ...q, question: value } : q
      )
    }));
  };

  const handleOptionChange = (index, value) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === currentQuestionIndex
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt))
            }
          : q
      )
    }));
  };

  const handleCorrectOptionChange = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === currentQuestionIndex
          ? {
              ...q,
              correctOptions: q.correctOptions.map((opt, i) =>
                i === index ? !opt : opt
              )
            }
          : q
      )
    }));
  };

  const isQuestionComplete = (question) => {
    return (
      question.question.trim() !== '' &&
      question.options.every(opt => opt.trim() !== '') &&
      question.correctOptions.some(opt => opt === true)
    );
  };

  const handleAddQuestion = () => {
    if (quizData.questions.length >= 10) {
      alert('Maximum 10 questions allowed!');
      return;
    }

    if (!isQuestionComplete(quizData.questions[currentQuestionIndex])) {
      alert('Please complete the current question before adding a new one!');
      return;
    }

    setQuizData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctOptions: [false, false, false, false]
        }
      ]
    }));
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleSaveQuiz = () => {
    if (!quizData.title.trim()) {
      alert('Please enter a quiz title!');
      return;
    }
    if (!quizData.description.trim()) {
      alert('Please enter a quiz description!');
      return;
    }
    if (!isQuestionComplete(quizData.questions[currentQuestionIndex])) {
      alert('Please complete the current question before saving!');
      return;
    }
    if (quizData.questions.length < 1) {
      alert('A quiz must have at least 1 question!');
      return;
    }

    // Save to localStorage with full questions array
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
    customQuizzes.push({
      id: Date.now(),
      title: quizData.title,
      description: quizData.description,
      createdBy: '2300031457@kluniversity.in',
      questions: quizData.questions.length,
      questionsData: quizData.questions
    });
    localStorage.setItem('customQuizzes', JSON.stringify(customQuizzes));

    navigate('/dashboard');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      navigate('/dashboard');
    }
  };

  const handleQuestionNav = (index) => {
    if (index < quizData.questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <div className="quiz-creator">
      <div className="quiz-form">
        <div className="quiz-header">
          <div className="form-group">
            <label>Quiz title:</label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleQuizDataChange}
              placeholder="Enter Quiz title"
            />
          </div>
          <div className="form-group">
            <label>Quiz description:</label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleQuizDataChange}
              placeholder="Enter Quiz description"
            />
          </div>
          <div className="total-questions">
            Total Questions : {quizData.questions.length}/10
          </div>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>

        <div className="question-nav">
          {quizData.questions.map((_, index) => (
            <button
              key={index}
              className={`question-nav-btn ${index === currentQuestionIndex ? 'active' : ''}`}
              onClick={() => handleQuestionNav(index)}
            >
              Q{index + 1}
            </button>
          ))}
        </div>

        <div className="question-section">
          <div className="form-group">
            <label>Question : {currentQuestionIndex + 1}</label>
            <input
              type="text"
              value={quizData.questions[currentQuestionIndex].question}
              onChange={handleQuestionChange}
              placeholder="Enter Question"
            />
          </div>

          <div className="options-grid">
            <div className="option-group">
              <label>Option : 1</label>
              <input
                type="text"
                value={quizData.questions[currentQuestionIndex].options[0]}
                onChange={(e) => handleOptionChange(0, e.target.value)}
                placeholder="Enter Option"
              />
            </div>
            <div className="option-group">
              <label>Option : 2</label>
              <input
                type="text"
                value={quizData.questions[currentQuestionIndex].options[1]}
                onChange={(e) => handleOptionChange(1, e.target.value)}
                placeholder="Enter Option"
              />
            </div>
            <div className="option-group">
              <label>Option : 3</label>
              <input
                type="text"
                value={quizData.questions[currentQuestionIndex].options[2]}
                onChange={(e) => handleOptionChange(2, e.target.value)}
                placeholder="Enter Option"
              />
            </div>
            <div className="option-group">
              <label>Option : 4</label>
              <input
                type="text"
                value={quizData.questions[currentQuestionIndex].options[3]}
                onChange={(e) => handleOptionChange(3, e.target.value)}
                placeholder="Enter Option"
              />
            </div>
          </div>

          <div className="correct-options">
            <p>Which of the options are correct?</p>
            <div className="checkbox-group">
              {[1, 2, 3, 4].map((num, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={quizData.questions[currentQuestionIndex].correctOptions[index]}
                    onChange={() => handleCorrectOptionChange(index)}
                  />
                  Option : {num}
                </label>
              ))}
            </div>
          </div>

          <div className="quiz-actions">
            {quizData.questions.length < 10 && (
              <button className="add-question-btn" onClick={handleAddQuestion}>
                Add Question
              </button>
            )}
            {quizData.questions.length > 0 && (
              <button className="save-quiz-btn" onClick={handleSaveQuiz}>
                Save Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreator; 