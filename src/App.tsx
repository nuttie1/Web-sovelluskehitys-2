import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';
import Login from './components/Login';
import Register from './components/Register';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import './styles/Navbar.css';

const client = new ApolloClient({
  uri: 'https://noo-web-app.azurewebsites.net/graphql',
  cache: new InMemoryCache()
});

function App() {
  // Sample data for the Profile and Leaderboard components
  const userProfile = { name: 'John Doe', email: 'john.doe@example.com' };
  const userScores = [
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 200 },
    { name: 'Charlie', score: 150 },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Kirjautumisen käsittelijä
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Uloskirjautumisen käsittelijä
    setIsLoggedIn(false);
  };

  
// ad title to the page
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav">
            <li>
              <Link to="/" className="navLink">
                <button className="navButton">Game</button>
              </Link>
            </li> 
            <li>
              <Link to="/Leaderboard" className="navLink">
                <button className="navButton">Leaderboard</button>
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/Profile" className="navLink">
                  <button className="navButton">Profile</button>
                </Link>
                ) : (
                <Link to="/Login" className="navLink">
                  <button className="navButton">Login</button>
                </Link>
              )}
            </li>
          </ul>
        </nav>

      <ApolloProvider client={client}>
        <Routes >
          <Route path="/" element={<Game />} />
          <Route path="/Profile" element={<Profile name={userProfile.name} email={userProfile.email} />} />
          <Route path="/Leaderboard" element={<Leaderboard scores={userScores} />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Register" element={<Register onLogin={handleLogin}/>} />
        </Routes>
      </ApolloProvider>
      </div>
    </Router>
  );
}
export default App;
