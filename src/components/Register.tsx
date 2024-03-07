import {useMutation, gql} from '@apollo/client';
import React, { useState,Dispatch, SetStateAction } from 'react';
import Filter from 'bad-words';

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
  const [errorText, setErrorText] = useState('');

  const [register, { data, loading, error }] = useMutation(REGISTER_MUAATION);

  const checkUsername = (username: string) => {
    const usernamePattern = new RegExp('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$');
      if (!usernamePattern.test(username)) {
        setErrorText('Username is too long/short or contains invalid characters!');
        return false;
      }
      const filter = new Filter();
      if (filter.isProfane(username)) {
        setErrorText('Username contains profanity!');
        return false;
      }
      return true;
  }
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!checkUsername(username)) {
        return;
      }

      await register({variables: { username, password } });
      if (data) {
        console.log('Registered:', data);
        localStorage.setItem('token', data.register.token);
        setIsLoggedIn(true);
      }
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
      <p className="error-text">{errorText}</p>
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
