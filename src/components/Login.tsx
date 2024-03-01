import React, { useState } from 'react';

import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
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
