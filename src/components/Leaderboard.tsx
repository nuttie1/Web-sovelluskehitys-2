import React from 'react';
import { useQuery, gql } from '@apollo/client';

import '../styles/Leaderboard.css';

interface UserScore {
  user_name: string;
  points: number;
}

interface LeaderboardData {
  users: UserScore[];
}

const GET_LEADERBOARD = gql`
  query Users {
    users {
      user_name
      points
    }
  }
`;

const Leaderboard: React.FC = () => {
  const { loading, error, data } = useQuery<LeaderboardData>(GET_LEADERBOARD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.users) return <p>No leaderboard data available.</p>;

  const sortedScores = [...data.users].sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <ul className="leaderboard-list">
        {sortedScores.map((userScore, index) => (
          <li key={index} className="leaderboard-item">
            <span className="leaderboard-name">{userScore.user_name}:</span>
            <span className="leaderboard-score">{userScore.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
