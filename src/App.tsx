import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';
import Login from './components/Login';
import Register from './components/Register';
import { ApolloProvider, createHttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './styles/Navbar.css';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const ProfileWrapper = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Profile /> : null;
};

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
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/Login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/Register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/Profile" element={<ProfileWrapper />} />
        </Routes>
      </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
