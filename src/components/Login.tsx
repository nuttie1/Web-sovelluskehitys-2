import {useMutation, gql} from '@apollo/client';
import React, { useState } from 'react';

import '../styles/Login.css';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(credentials: {username: $username, password: $password}) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({variables: { username, password } });
    } catch (error) {
      console.error('Error logging in:', error);
    }

    console.log(`Logging in with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <input type="submit" value="Submit" className="login-button" />
      </form>
      <a href="/register" className="signup-link">No account yet? Sign up</a>
    </div>
  );
};

export default Login;
