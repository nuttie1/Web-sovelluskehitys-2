import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { checkUsername, checkPassword } from '../functions/checkData';


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

const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
        id
        user_name
    }
  }
`;

const VERIFY_PASSWORD = gql`
  mutation VerifyPassword($username: String!, $password: String!) {
    verifyPassword(user_name: $username, password: $password)
  }
`;


const Profile: React.FC = () => {
  const { loading, error, data } = useQuery(GET_USER);
  const [updateUser ] = useMutation(UPDATE_USER);
  const [verifyPassword] = useMutation(VERIFY_PASSWORD);

  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [errorTextUsername, setErrorTextUsername] = useState('');
  const [errotTextOldPassword, setErrorTextOldPassword] = useState('');
  const [errotTextNewPassword, setErrorTextNewPassword] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleUsernameUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!checkUsername(newUsername).valid) {
        setErrorTextUsername(checkUsername(newUsername).message);
        return;
      }
      //const { data } = await updateUser({variables: { user: {user_name: newUsername} } });
      setErrorTextUsername("");
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorTextUsername("error");
    }
  }

  const handlePasswordUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!checkPassword(oldPassword).valid || !checkPassword(newPassword)) {
        setErrorTextOldPassword(checkPassword(oldPassword).message);
        setErrorTextNewPassword(checkPassword(newPassword).message);
        return;
      }

      const { data: verifyData } = await verifyPassword({variables: {username: data.checkToken.user.user_name, password: oldPassword}});

      if (!verifyData.verifyPassword) {
        setErrorTextOldPassword("Password doesn't match!");
        return;
      }
      //await updateUser({variables: { user: {password: newPassword} } });
      setErrorTextOldPassword("");
      setErrorTextNewPassword("");
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">{data.checkToken.user.user_name}</h1>
      <p className="profile-points">{data.checkToken.user.points}</p>
      <button onClick={() => setShowModal(true)} className="update-button">Update</button>
      <button onClick={handleLogout} className="update-button">Logout</button>
      {showModal && (
        <div className="modal-background">
        <div className="modal">
        <button onClick={() => setShowModal(false)} className="close-button">Close</button>
          <h2 className="profile-title-form">Update your data</h2>
          <p className="error-text">{errorTextUsername}</p>
          <form className="updateUser-form">
           <label>
             Username:
             <input type="text" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                className="update-input"
              />
            </label>
            <button type="submit" onClick={handleUsernameUpdate} className="update-button">Update</button>
            <p className="error-text">{errotTextOldPassword}</p>
            <label>
              Old Password:
              <input type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                className="update-input"
              />
            </label>
            <p className="error-text">{errotTextNewPassword}</p>
            <label>
              New Password: 
              <input type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="update-input"
              />
            </label>
              <button type="submit" onClick={handlePasswordUpdate} className="update-button">Update</button>
          </form>
        </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
