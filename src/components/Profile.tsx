import React from 'react';

import '../styles/Profile.css';


const Profile: React.FC = () => {

  const name = "John Doe";
  const email = "example@mail";

  return (
    <div className="profile-container">
      <h1 className="profile-title">{name}</h1>
      <p className="profile-email">{email}</p>
      <p className="profile-points">Your points: 0</p>
    </div>
  );
};

export default Profile;
