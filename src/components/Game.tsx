import React, { useState } from 'react';
import { csPlayer } from '../types/DBTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, gql} from '@apollo/client';
import '../styles/Game.css';


const GET_USER = gql` 
  query CheckToken {
    checkToken {
      user {
        points
      }
    }
  }
`;

const ADD_POINTS_MUTATION = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      user {
        points
      }
    }
  }
`;

function Game() {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<csPlayer[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [showAnswer, setShowAnswer] = useState(false);
  const [addPoints] = useMutation(ADD_POINTS_MUTATION);
  const {loading, error, data} = useQuery(GET_USER);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    const isCorrectGuess = guessedPlayer.name === hardcodedPlayer.name;
      if (isCorrectGuess) {
        const newPoints = data.checkToken.user.points + remainingGuesses;
        await addPoints({
          variables: {
            user: {
              points: newPoints
            }
          }
        });
        console.log('Correct guess! Points: ' + remainingGuesses);
        setShowAnswer(true);
      } else if (remainingGuesses === 1) {
        setShowAnswer(true);
        console.log('No more guesses left');
      } else {
        setRemainingGuesses(prev => prev - 1);
        console.log('Incorrect guess');
      }

    setGuesses([...guesses, guessedPlayer]);

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
          disabled={showAnswer} // Estä syötteen ottaminen, kun oikea vastaus on näytetty
        />
        <input
          type="submit"
          value="Guess"
          className="guess-button"
          disabled={showAnswer} // Estä arvauksen tekeminen, kun oikea vastaus on näytetty
        />
      </form>

        {remainingGuesses > 0 && !showAnswer && (
          <p>Remaining guesses: {remainingGuesses}</p> // Näytä jäljellä olevien arvausten määrä, jos arvauksia on vielä jäljellä
        )}

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
              <td className={player.age === hardcodedPlayer.age ? 'correct-guess' : 'incorrect-guess'}>
                {player.age} {player.age === hardcodedPlayer.age ? '' : player.age > hardcodedPlayer.age ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </td>
              <td className={player.role === hardcodedPlayer.role ? 'correct-guess' : 'incorrect-guess'}>{player.role}</td>
              <td className={player.total_winnings === hardcodedPlayer.total_winnings ? 'correct-guess' : 'incorrect-guess'}>
                {player.total_winnings} $ {player.total_winnings === hardcodedPlayer.total_winnings ? '' : player.total_winnings > hardcodedPlayer.total_winnings ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAnswer && (
        <div>
          <p>Correct answer:</p>
          <table>
            <tbody>
              <tr>
                <td className='correct-guess'>{hardcodedPlayer.name}</td>
                <td className='correct-guess'>{hardcodedPlayer.country}</td>
                <td className='correct-guess'>{hardcodedPlayer.team}</td>
                <td className='correct-guess'>{hardcodedPlayer.age}</td>
                <td className='correct-guess'>{hardcodedPlayer.role}</td>
                <td className='correct-guess'>{hardcodedPlayer.total_winnings} $</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Game;
