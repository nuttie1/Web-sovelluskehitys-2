import {useMutation, gql} from '@apollo/client';
import React, { useState,Dispatch, SetStateAction } from 'react';
import { checkUsername, checkPassword } from '../functions/checkData';

import '../styles/Register.css';

const REGISTER_MUAATION = gql`  
  mutation Register($username: String!, $password: String!) {
    register(user: {user_name: $username, password: $password}) {
      user {
        id
        user_name
      }
    }
  }
`;

interface IsUserLoggedIn {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const RegisterPage: React.FC<IsUserLoggedIn> = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorTextUsername, setErrorTextUsername] = useState('');
  const [errotTextPassword, setErrorTextPassword] = useState('');

  const [register, { data, loading, error }] = useMutation(REGISTER_MUAATION);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!checkUsername(username).valid || !checkPassword(password).valid) {
        setErrorTextUsername(checkUsername(username).message);
        setErrorTextPassword(checkPassword(password).message);
        return;
      }
    
      await register({variables: { username, password } });
      if (data) {
        console.log('Registered:', data);
        localStorage.setItem('token', data.register.token);
        setIsLoggedIn(true);
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
