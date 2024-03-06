import React, { useEffect, useState } from 'react';
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
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

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
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/Register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
        </Routes>
      </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
