import React, { useState } from 'react';

import '../styles/Register.css';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Implement registration logic here
    };

    return (
        <div className="register-form-container">
          <h1 className="register-title">Create account</h1>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-group">
              <label htmlFor="username" className="register-label">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="register-input"
              />
            </div>
            <div className="register-form-group">
              <label htmlFor="password" className="register-label">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="register-input"
              />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      );
};

export default RegisterPage; 