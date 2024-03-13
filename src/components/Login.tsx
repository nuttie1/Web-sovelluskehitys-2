import {useMutation, gql} from '@apollo/client';
import React, { useState,Dispatch, SetStateAction } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import '../styles/Login.css';

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
 * Login component to allow users to login
 * @function Login
 * @param setIsLoggedIn The function to set the user's logged in status to true
 * @returns The Login component
 */
const Login: React.FC<IsUserLoggedIn> = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username === "" || password === "") {
      setErrorText("Username/Password is empty!");
      return;
    }

    try {
      const { data } = await login({variables: { username, password } });

      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
        setIsLoggedIn(true);
        navigate('/')
      }
      setErrorText("");
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
      <Link to="/register" className="signup-link">No account yet? Sign up</Link>
    </div>
  );
};

export default Login;
