import {useMutation, gql} from '@apollo/client';
import React, { useState,Dispatch, SetStateAction } from 'react';
import { checkUsername, checkPassword } from '../functions/checkData';
import {useNavigate} from 'react-router-dom';

import '../styles/Register.css';

/**
 * GraphQL mutation to register a user
 * @constant REGISTER_MUTATION
 * @returns The user object with their ID and username
 */
const REGISTER_MUTATION = gql`  
  mutation Register($username: String!, $password: String!) {
    register(user: {user_name: $username, password: $password}) {
      user {
        id
        user_name
      }
    }
  }
`;

/**
 * GraphQL mutation to login a user
 * @constant LOGIN_MUTATION
 * @returns The users token and user object with id and username
 */
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: {user_name: $username, password: $password}) {
      token
      user {
        id
        user_name
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
 * Register component to allow users to register 
 * @returns The Register component
 */
const RegisterPage: React.FC<IsUserLoggedIn> = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorTextUsername, setErrorTextUsername] = useState('');
  const [errotTextPassword, setErrorTextPassword] = useState('');

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const [login] = useMutation(LOGIN_MUTATION);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!checkUsername(username).valid || !checkPassword(password).valid) {
        setErrorTextUsername(checkUsername(username).message);
        setErrorTextPassword(checkPassword(password).message);
        return;
      }
      await register({variables: { username, password } });
      const { data } = await login({variables: { username, password } });
      if (data?.login?.token) {
        console.log('Registered:', data);
        localStorage.setItem('token', data.login.token);
        setIsLoggedIn(true);
        navigate('/');
      }
      setErrorTextUsername("");
      setErrorTextPassword("");
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  if (loading) return <p>Registering...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) console.log('Registered:', data);

  return (
    <div className="register-form-container">
      <h1 className="register-title">Create account</h1>
      <p className="error-text">{errorTextUsername}</p>
        <form onSubmit={handleSubmit} className="register-form">
          <label className="register-label">
            Username:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="register-input"
            />
          </label>
          <p className="error-text">{errotTextPassword}</p>
          <label className="register-label">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
            />
          </label>
            <button type="submit" className="register-button">Register</button>
          </form>
    </div>
  );
};

export default RegisterPage; 
