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

/**
 * Apollo Client setup
 */
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

/**
 * This function sets the authorization header for the Apollo Client
 * @param headers: The headers for the Apollo Client
 * @returns The headers for the Apollo Client
 */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

/**
 * This is the Apollo Client
 * @param link: The link for the Apollo Client
 * @param cache: The cache for the Apollo Client
 * @returns The Apollo Client
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

/**
 * This is the wrapper for the profile component
 * Checks if the user is authenticated and redirects to the login page if not
 * @param isAuthenticated: Whether the user is authenticated
 * @param navigate: The navigate function for the router
 * @returns The profile component if the user is authenticated
 */
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

/**
 * This is the App component, compiles all the components together
 * @param isLoggedIn: Whether the user is logged in
 * @param setIsLoggedIn: The function to set whether the user is logged in
 * @returns The App component
 */
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
