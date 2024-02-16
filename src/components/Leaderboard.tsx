import React from 'react';

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
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {sortedScores.map((userScore, index) => (
          <li key={index}>
            {userScore.name}: {userScore.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
export {};
