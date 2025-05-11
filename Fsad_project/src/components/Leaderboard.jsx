import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  // Mock leaderboard data - replace with actual API call
  const leaderboardData = [
    { rank: 1, user: "roger", score: 80 },
    { rank: 2, user: "zikramohammed00@gmail.com", score: 70 },
    { rank: 3, user: "menu@gmail.com", score: 60 },
    { rank: 4, user: "prahladkush231@gmail.com", score: 60 },
    { rank: 5, user: "dheeraj@gmail.com", score: 50 },
    { rank: 6, user: "kunal@gmail.com", score: 20 },
    { rank: 7, user: "mrtt45778@gmail.com", score: 20 },
    { rank: 8, user: "johndoe@example.com", score: 10 },
    { rank: 9, user: "hameha939@gmail.com", score: 0 }
  ];

  return (
    <div className="leaderboard-container">
      <div className="app-header">
        <h1 className="app-title">Quick Quizzer</h1>
        <h2 className="challenge-title">Eclectic Knowledge Challenge</h2>
      </div>
      
      <div className="leaderboard-content">
        <h2 className="leaderboard-title">Leaderboard</h2>
        
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="rank-column">Rank</div>
            <div className="user-column">User</div>
            <div className="score-column">Score</div>
          </div>
          
          {leaderboardData.map((entry) => (
            <div key={entry.rank} className="table-row">
              <div className="rank-column">{entry.rank}</div>
              <div className="user-column">{entry.user}</div>
              <div className="score-column">{entry.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 