import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';
import Login from './components/Login';
import Register from './components/Register';

import { CSSProperties } from 'react';


function App() {
  // Sample data for the Profile and Leaderboard components
  const userProfile = { name: 'John Doe', email: 'john.doe@example.com' };
  const userScores = [
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 200 },
    { name: 'Charlie', score: 150 },
  ];

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: '10px',
    backgroundColor: '#f3f3f3',
    borderRadius: '5px',
  };
  const appStyle: CSSProperties  = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // This will make sure your app takes the full height of the viewport
    textAlign: 'center', // This will center the text
  };
  
  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
  };
  const buttonStyle = {
    padding: '10px 20px', // Increase padding to make buttons bigger
    fontSize: '18px', // Increase font size to make text bigger
  };
  

  return (
    <Router>
      <div style={appStyle}>
        <nav>
          <ul style={navStyle}>
            <li>
              <Link to="/" style={linkStyle}>
                <button style={buttonStyle}>Game</button>
              </Link>
            </li>
            
            <li>
              <Link to="/Leaderboard" style={linkStyle}>
                <button style={buttonStyle}>Leaderboard</button>
              </Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Profile" style={linkStyle}>
                <button style={buttonStyle}>Profile</button>
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/Profile" element={<Profile name={userProfile.name} email={userProfile.email} />} />
          <Route path="/Leaderboard" element={<Leaderboard scores={userScores} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
