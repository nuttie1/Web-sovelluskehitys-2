import React, {useState} from 'react';
import {csPlayer} from '../types/DBTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, gql} from '@apollo/client';
import '../styles/Game.css';

const GET_ID = gql` 
  query CheckToken {
    checkToken {
      user {
        id
      }
    }
  }
`;

const GET_USER = gql` 
  query GetUserById($id: ID!) {
    userById(id: $id) { 
      user_name
      points 
    }
  }
`

const ADD_POINTS_MUTATION = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      user {
        points
      }
    }
  }
`;

const GET_CS_PLAYER = gql`
  query GetCsPlayerByName($name: String!) {
    getCsPlayerByName(name: $name) {
      id
      name
      country
      team
      age
      role
      total_winnings
    }
  }
`;

function Game() {
  const [guess, setGuess] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [guesses, setGuesses] = useState<csPlayer[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [showAnswer, setShowAnswer] = useState(false);
  const [addPoints] = useMutation(ADD_POINTS_MUTATION);
  const {loading, error, data} = useQuery(GET_ID);
  const [showModal, setShowModal] = useState(false);

  const id = data?.checkToken?.user?.id;
  const { data: userData, loading: userLoading, error: userError, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !id || id === null,
  });

  // Player of the day (Name hardcoded for now, will be randomized later on)
  const playerName = "donk";
  const {data: playerOfTheDayData} = useQuery(GET_CS_PLAYER, {
    variables: { name: playerName },
  });

  // Guessed player
  const {data: guessedPlayerData, refetch: refetchGuessedPlayer } = useQuery(GET_CS_PLAYER, {
    variables: { name: guess },
    skip: !guess,
  });

  const playerOfTheDay: csPlayer = {
    id: playerOfTheDayData?.getCsPlayerByName.id,
    name: playerOfTheDayData?.getCsPlayerByName.name,
    country: playerOfTheDayData?.getCsPlayerByName.country,
    team: playerOfTheDayData?.getCsPlayerByName.team,
    age: playerOfTheDayData?.getCsPlayerByName.age,
    role: playerOfTheDayData?.getCsPlayerByName.role,
    total_winnings: playerOfTheDayData?.getCsPlayerByName.total_winnings,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGuess(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    refetchGuessedPlayer()
    const guessedPlayer: csPlayer = {
      id: guessedPlayerData?.getCsPlayerByName.id,
      name: guessedPlayerData?.getCsPlayerByName.name,
      country: guessedPlayerData?.getCsPlayerByName.country,
      team: guessedPlayerData?.getCsPlayerByName.team,
      age: guessedPlayerData?.getCsPlayerByName.age,
      role: guessedPlayerData?.getCsPlayerByName.role,
      total_winnings: guessedPlayerData?.getCsPlayerByName.total_winnings,
    };
    
    if (guessedPlayer.name === playerOfTheDay.name) {
      setIsCorrectGuess(true);
      await refetch();
      const newPoints = userData.userById.points + remainingGuesses;
      await addPoints({
        variables: {
          user: {
            points: newPoints
          }
        }
      });
      setShowAnswer(true);
      setShowModal(true);
    } else if (remainingGuesses === 1) {
      setShowAnswer(true);
      setShowModal(true);
    } else {
      setRemainingGuesses(prev => prev - 1);
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
          disabled={showAnswer}
        />
        <input
          type="submit"
          value="Guess"
          className="guess-button"
          disabled={showAnswer}
        />
      </form>

        {remainingGuesses > 0 && !showAnswer && (
          <p>Remaining guesses: {remainingGuesses}</p>
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
              <td className={player.name === playerOfTheDay.name ? 'correct-guess' : 'incorrect-guess'}>{player.name}</td>
              <td className={player.country === playerOfTheDay.country ? 'correct-guess' : 'incorrect-guess'}>{player.country}</td>
              <td className={player.team === playerOfTheDay.team ? 'correct-guess' : 'incorrect-guess'}>{player.team}</td>
              <td className={player.age === playerOfTheDay.age ? 'correct-guess' : 'incorrect-guess'}>
                {player.age} {player.age === playerOfTheDay.age ? '' : player.age > playerOfTheDay.age ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </td>
              <td className={player.role === playerOfTheDay.role ? 'correct-guess' : 'incorrect-guess'}>{player.role}</td>
              <td className={player.total_winnings === playerOfTheDay.total_winnings ? 'correct-guess' : 'incorrect-guess'}>
                {player.total_winnings} $ {player.total_winnings === playerOfTheDay.total_winnings ? '' : player.total_winnings > playerOfTheDay.total_winnings ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
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
                <td className='correct-guess'>{playerOfTheDay.name}</td>
                <td className='correct-guess'>{playerOfTheDay.country}</td>
                <td className='correct-guess'>{playerOfTheDay.team}</td>
                <td className='correct-guess'>{playerOfTheDay.age}</td>
                <td className='correct-guess'>{playerOfTheDay.role}</td>
                <td className='correct-guess'>{playerOfTheDay.total_winnings} $</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="modal-background">
        <div className="modal">
          <button onClick={() => setShowModal(false)} className="close-button">Close</button>
          <h2 className="modal-title">Game over</h2>
          {isCorrectGuess ? (
            <div>
              <p className="modal-text">Congratulations, you guessed correctly! The player was: {playerOfTheDay.name}</p>
              <p className="modal-text">You got {remainingGuesses} points!</p>
            </div>
          ) : (
            <div>
              <p className="modal-text">Sorry, no more guesses left. The correct player was: {playerOfTheDay.name}</p>
              <p className="modal-text">You got 0 points</p>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}

export default Game;
