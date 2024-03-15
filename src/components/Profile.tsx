import React, { useState, SetStateAction, Dispatch } from 'react';
import { gql, useQuery, useMutation, ApolloError, useApolloClient } from '@apollo/client';
import { checkUsername, checkPassword } from '../functions/checkData';
import { useNavigate } from 'react-router-dom';

import '../styles/Profile.css';

/**
 * GraphQL query to check users token and get their ID
 * @returns User Object with their ID
 */
const GET_ID = gql` 
  query CheckToken {
    checkToken {
      user {
        id
      }
    }
  }
`;

/**
 * GraphQL query to get a user by their ID
 * @param id: The ID of the user
 * @returns The user's username and points with the given ID
 */
const GET_USER = gql` 
  query GetUserById($id: ID!) {
    userById(id: $id) { 
      user_name
      points 
    }
  }
`

/**
 * GraphQL mutation to update a user
 * @param user: The user's updated data
 * @returns User object with their updated data
 */
const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      user {
        user_name
        points
      }
    }
  }
`;

/**
 * GraphQL mutation to verify a user's password
 * @param username: The user's username
 * @param password: The user's password
 * @returns True if the password is correct
 */
const VERIFY_PASSWORD = gql`
  mutation VerifyPassword($username: String!, $password: String!) {
    verifyPassword(user_name: $username, password: $password)
  }
`;

/**
 * GraphQL mutation to delete a user
 * @returns The deleted user's ID
 */
const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      user {
        id
      }
    }
  }
`;

/**
 * Interface for the IsUserLoggedIn function
 * @interface IsUserLoggedIn
 * @param setIsLoggedIn The function to set the user's logged in status to true 
 * @returns The IsUserLoggedIn interface
 */
interface IsUserLoggedIn {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

/**
 * Profile component to display the user's profile
 * @function Profile
 * @returns The Profile component
 */
const Profile: React.FC<IsUserLoggedIn> = ({setIsLoggedIn}) => {
  const client = useApolloClient();
  
  const { data } = useQuery(GET_ID);
  const id = data?.checkToken?.user?.id;
  const { data: userData, loading: userLoading, error: userError, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !id || id === null,
  });
  const [deleteUser] = useMutation(DELETE_USER);

  const navigate = useNavigate();

  const [updateUser] = useMutation(UPDATE_USER);
  const [verifyPassword] = useMutation(VERIFY_PASSWORD);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalReset, setShowModalReset] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [errorTextUsername, setErrorTextUsername] = useState('');
  const [errorTextOldPassword, setErrorTextOldPassword] = useState('');
  const [errorTextNewPassword, setErrorTextNewPassword] = useState('');

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError.message}</p>;

  if (!userData || !userData.userById) return <p>No user data</p>;

  const handleUsernameUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!checkUsername(newUsername).valid) {
        setErrorTextUsername(checkUsername(newUsername).message);
        return;
      }
      await updateUser({variables: { user: {user_name: newUsername} } });
      refetch(); // Refetch the user data to keep the UI updated
      setErrorTextUsername("");
      setNewUsername("");
      setShowModalUpdate(false);
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
      const { data: verifyData } = await verifyPassword({variables: {username: userData.userById.user_name, password: oldPassword}});

      if (!verifyData.verifyPassword) {
        setErrorTextOldPassword("Password doesn't match!");
        return;
      }
      await updateUser({variables: { user: {password: newPassword} } });
      refetch(); // Refetch the user data to keep the UI updated
      setErrorTextOldPassword("");
      setErrorTextNewPassword("");
      setOldPassword("");
      setNewPassword("");
      setShowModalUpdate(false);
    } catch (error) {
      console.error('Error updating user:', error);
      if ((error as ApolloError).graphQLErrors) {
        (error as ApolloError).graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if ((error as ApolloError).networkError) {
        console.log(`[Network error]: ${(error as ApolloError).networkError}`);
      }
    }
  }

  const HandleResetPoints = async () => {
    try {
      await updateUser({variables: { user: {points: 0} } });
      refetch();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
  
  const HandleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    client.clearStore(); // Clear the Apollo cache to prevent old data from being used
    navigate('/login');
  };

  const HandleUserDelete = async () => {
    try {
      await deleteUser();
      HandleLogout();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">{userData.userById.user_name}</h1>
      <p className="profile-points">Your points: {userData.userById.points}</p>
      <button onClick={() => setShowModalUpdate(true)} className="update-button">Edit</button>
      <button onClick={HandleLogout} className="update-button">Logout</button>
      <br />
      <button onClick={() => setShowModalDelete(true)} className="update-red-button">Delete</button>
      <button onClick={() => setShowModalReset(true)} className="update-red-button">Reset Points</button>
      {showModalUpdate && (
        <div className="modal-background">
        <div className="modal">
        <button onClick={() => setShowModalUpdate(false)} className="close-button">Close</button>
          <h2 className="profile-title-form">Update your data</h2>
          <p className="error-text">{errorTextUsername}</p>
          <form className="updateUser-form" onSubmit={handleUsernameUpdate}>
           <label>
             Username:
             <input type="text" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
                className="update-input"
              />
            </label>
            <button type="submit" className="update-button">Update</button>
            </form>
            <p className="error-text">{errorTextOldPassword}</p>
            <form className="updateUser-form" onSubmit={handlePasswordUpdate}>
            <label>
              Old Password:
              <input type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                className="update-input"
              />
            </label>
            <p className="error-text">{errorTextNewPassword}</p>
            <label>
              New Password: 
              <input type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="update-input"
              />
            </label>
            <button type="submit"className="update-button" >Update</button>
          </form>
        </div>
        </div>
      )}
      {showModalDelete && (
        <div className="modal-background">
        <div className="modal">
        <button onClick={() => setShowModalDelete(false)} className="close-button">Close</button>
          <h2 className="profile-title-form-delete">Are you sure?</h2>
          <button onClick={HandleUserDelete} className="update-button">Yes</button>
        </div>
        </div>
      )}
      {showModalReset && (
        <div className="modal-background">
          <div className="modal">
            <button onClick={() => setShowModalReset(false)} className="close-button">Close</button>
            <h2 className="profile-title-form-delete">Are you sure?</h2>
            <button onClick={HandleResetPoints} className="update-button">Yes</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
