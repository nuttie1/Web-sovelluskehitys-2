import {useMutation, gql} from '@apollo/client';
import React, { useState,Dispatch, SetStateAction } from 'react';

import '../styles/Login.css';

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

interface IsUserLoggedIn {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<IsUserLoggedIn> = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (event: React.FormEvent) => {
    console.log('Logging in...');
    event.preventDefault();
    try {
      const { data } = await login({variables: { username, password } });

      if (data?.login?.token) {
        console.log('Logged in:', data);
        localStorage.setItem('token', data.login.token);
        setIsLoggedIn(true);
      }

    } catch (error) {
      console.error('Error logging in:', error);
      setErrorText('Invalid username or password!');
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
      <p className="error-text">{errorText}</p>
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
