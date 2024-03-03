import {useMutation, gql} from '@apollo/client';
import React, { useState } from 'react';

import '../styles/Register.css';

const REGISTER_MUAATION = gql`  
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(user: {email: $email, user_name: $username, password: $password}) {
      user {
        id
        user_name
      }
    }
  }
`;

const RegisterPage: React.FC<{onLogin: () => void;}> = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [register, { data, loading, error }] = useMutation(REGISTER_MUAATION);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await register({variables: { email, username, password } });

      if (data) {
        console.log('Registered:', data);
        onLogin();
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="register-form-container">
      <h1 className="register-title">Create account</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <label className="register-label">
            email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"  
            />
          </label>
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