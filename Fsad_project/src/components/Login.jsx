import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (email && password) {
        if (email === '2300031457@kluniversity.in' && password !== 'sunil') {
          setError('Invalid admin password!');
          setLoading(false);
          return;
        }
        onLoginSuccess(email);
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1200);
  };

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const isCaptchaCorrect = captchaInput.trim().toUpperCase() === captcha;

  return (
    <div className="login-container gradient-bg fade-in">
      <div className="auth-buttons fade-in">
        <Link to="/register" className="register-btn">Register</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
      <div className="login-form card-shadow fade-in">
        <h2>- Welcome Back -</h2>
        {error && <div className="error-message shake">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password :</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="show-password">
            <label className="switch">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <span className="slider round"></span>
              <span className="show-label">Show Password</span>
            </label>
          </div>
          <div className="captcha-group">
            <div className="captcha-box">
              <span className="captcha-text">{captcha}</span>
              <button type="button" className="refresh-captcha" onClick={handleRefreshCaptcha} title="Refresh Captcha">&#x21bb;</button>
            </div>
            <input
              type="text"
              className="captcha-input"
              placeholder="Enter captcha"
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value)}
              required
            />
            {!isCaptchaCorrect && captchaInput && (
              <div className="captcha-error">Captcha does not match</div>
            )}
          </div>
          <button type="submit" className="login-submit-btn" disabled={loading || !isCaptchaCorrect}>
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 