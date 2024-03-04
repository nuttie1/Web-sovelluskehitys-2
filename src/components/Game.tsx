import React, { useState } from 'react';
import { csPlayer } from '../types/DBTypes';
import '../styles/Game.css';

function Game() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<csPlayer[]>([]);

  // Hardcoded player for testing
  const hardcodedPlayer: csPlayer = {
    id: "1",
    name: "s1mple",
    country: "Ukraine",
    team: "Falcons",
    age: 26,
    role: "rifler",
    total_winnings: 1726000,
  };

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
};

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Hardcoded guess for testing
  const guessedPlayer: csPlayer = {
    id: "2",
    name: guess,
    country: "Finland",
    team: "JANO",
    age: 20,
    role: "rifler",
    total_winnings: 15,
  };

  // Tarkista, osuiko arvaus oikeaan pelaajaan
  const isCorrectGuess =
    guessedPlayer.name === hardcodedPlayer.name &&
    guessedPlayer.country === hardcodedPlayer.country &&
    guessedPlayer.team === hardcodedPlayer.team &&
    guessedPlayer.age === hardcodedPlayer.age &&
    guessedPlayer.role === hardcodedPlayer.role &&
    guessedPlayer.total_winnings === hardcodedPlayer.total_winnings;

    if (isCorrectGuess) {
      console.log('Correct guess');
    } else {
      console.log('Incorrect guess');
    }

  // Päivitä arvauslista
  setGuesses([...guesses, guessedPlayer]);

  // Tyhjennä syötekenttä
  setGuess('');
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

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Team</th>
          <th>Age</th>
          <th>Role</th>
          <th>Earnings</th>
        </tr>
      </thead>
      <tbody>
        {guesses.map((player, index) => (
          <tr key={index}>
            <td className={player.name === hardcodedPlayer.name ? 'correct-guess' : 'incorrect-guess'}>{player.name}</td>
            <td className={player.country === hardcodedPlayer.country ? 'correct-guess' : 'incorrect-guess'}>{player.country}</td>
            <td className={player.team === hardcodedPlayer.team ? 'correct-guess' : 'incorrect-guess'}>{player.team}</td>
            <td className={player.age === hardcodedPlayer.age ? 'correct-guess' : 'incorrect-guess'}>{player.age}</td>
            <td className={player.role === hardcodedPlayer.role ? 'correct-guess' : 'incorrect-guess'}>{player.role}</td>
            <td className={player.total_winnings === hardcodedPlayer.total_winnings ? 'correct-guess' : 'incorrect-guess'}>{player.total_winnings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default Game;