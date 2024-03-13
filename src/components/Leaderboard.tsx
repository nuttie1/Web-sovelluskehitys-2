import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import '../styles/Leaderboard.css';

/**
 * The UserScore interface with user's username and points
 * @interface UserScore
 * @param user_name The user's username
 * @param points The user's points
 * @returns The UserScore interface
 */
interface UserScore {
  user_name: string;
  points: number;
}

/**
 * The LeaderboardData interface with an array of Users
 * @interface LeaderboardData
 * @param users The array of UserScore
 * @returns The LeaderboardData interface
 */
interface LeaderboardData {
  users: UserScore[];
}

/**
 * GraphQL query to get all users
 * @constant GET_LEADERBOARD
 * @returns User object with username and points
 */
const GET_LEADERBOARD = gql`
  query Users {
    users {
      user_name
      points
    }
  }
`;

/**
 * Leaderboard component to display the leaderboard
 * @function Leaderboard
 * @returns The Leaderboard component
 */
const Leaderboard: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<LeaderboardData>(GET_LEADERBOARD);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
