import {useMutation, gql} from '@apollo/client';
import React, { useState } from 'react';

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

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [register, { data, loading, error }] = useMutation(REGISTER_MUAATION);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register({variables: { username, password } });
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
