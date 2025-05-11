import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import QuizPlayer from './components/QuizPlayer';
import QuizCreator from './components/QuizCreator';
import QuizResults from './components/QuizResults';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const handleLoginSuccess = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route 
            path="/login" 
            element={<Login onLoginSuccess={handleLoginSuccess} />} 
          />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard userEmail={userEmail} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-quiz" 
            element={
              <ProtectedRoute>
                <QuizCreator />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/take-quiz/:quizId" 
            element={
              <ProtectedRoute>
                <QuizPlayer />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quiz-results" 
            element={
              <ProtectedRoute>
                <QuizResults />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/logout" 
            element={
              <Navigate to="/login" replace={true} />
            } 
          />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
