import React from 'react';

import '../styles/Profile.css';

interface UserProfile {
  name: string;
  email: string;
}

const Profile: React.FC<UserProfile> = ({ name, email }) => {
  return (
    <div className="profile-container">
      <h1 className="profile-title">{name}</h1>
      <p className="profile-email">{email}</p>
      <p className="profile-points">Your points: 0</p>
    </div>
  );
};

export default Profile;
