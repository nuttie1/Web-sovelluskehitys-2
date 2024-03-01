import React from 'react';

import '../styles/Leaderboard.css';

interface UserScore {
  name: string;
  score: number;
}

interface LeaderboardProps {
  scores: UserScore[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  // Sort scores in descending order
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ul className="leaderboard-list">
        {sortedScores.map((userScore, index) => (
          <li key={index} className="leaderboard-item">
            <span className="leaderboard-name">{userScore.name}:</span>
            <span className="leaderboard-score">{userScore.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
