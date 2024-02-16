import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  // Sample data for the Profile and Leaderboard components
  const userProfile = { name: 'John Doe', email: 'john.doe@example.com' };
  const userScores = [
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 200 },
    { name: 'Charlie', score: 150 },
  ];

  return (
    <Router>
      <div>
        <h1>GAME</h1>
        <p>Welcome to the GAME.</p>

        <nav>
          <ul>
            <li>
              <Link to="/">Game</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Leaderboard">Leaderboard</Link>
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
