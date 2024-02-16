import React from 'react';

interface UserProfile {
  name: string;
  email: string;
}

const Profile: React.FC<UserProfile> = ({ name, email }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
};

export default Profile;
