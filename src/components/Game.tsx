import React, { useState } from 'react';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={guess} onChange={handleChange} />
        <input type="submit" value="Guess" />
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Game;