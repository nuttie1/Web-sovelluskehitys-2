import React from 'react';
import { gql, useQuery } from '@apollo/client';

import '../styles/Profile.css';

const GET_USER = gql` 
  query CheckToken {
    checkToken {
      user {
        id
        user_name
        points
      }
    }
  }
`;

const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">{data.checkToken.user.user_name}</h1>
      <p className="profile-points">{data.checkToken.user.points}</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Profile;
