import React, { useState } from 'react';

import '../styles/Game.css';

const players = ['s1mple', 'ZywOo', 'device', 'NiKo', 'electronic']; // Add more player names as needed

function Game() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState(players[Math.floor(Math.random() * players.length)]);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guess === target) {
        setMessage('You guessed correctly!');
    } else {
        setMessage('Try again.');
    }
};

return (
    <div className="game-container">
      <h1 className="game-title">GAME</h1>
      <p className="game-description">Welcome to the GAME.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          className="guess-input"
          placeholder="Enter your guess"
        />
        <input
          type="submit"
          value="Guess"
          className="guess-button"
        />
      </form>

      <p className="game-message">{message}</p>
    </div>
  );
}

export default Game;