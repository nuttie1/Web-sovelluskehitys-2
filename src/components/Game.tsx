import React, {useState} from 'react';
import {csPlayer} from '../types/DBTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {useMutation, useQuery, gql} from '@apollo/client';
import Select from 'react-select';
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

const GET_RANDOM_PLAYER = gql`
  query GetRandomPlayer {
    getRandomPlayer {
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

const GET_ALL_PLAYER_NAMES = gql`
  query GetAllPlayerNames {
    getAllPlayerNames
  }
`;

function Game() {
  const {loading: playerLoading, error: playerError, data: randomPlayer } = useQuery(GET_RANDOM_PLAYER);
  const [guess, setGuess] = useState('');
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [guesses, setGuesses] = useState<csPlayer[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState(8);
  const [showAnswer, setShowAnswer] = useState(false);
  const [addPoints] = useMutation(ADD_POINTS_MUTATION);
  const {loading, error, data} = useQuery(GET_ID);
  const [showModal, setShowModal] = useState(false);
  const [isUpdatingPoints, setIsUpdatingPoints] = useState(false);
  const [pointsChange, setPointsChange] = useState(0);
  const [guessAmount, setGuessAmount] = useState(0);

  // User data
  const id = data?.checkToken?.user?.id;
  const { data: userData, loading: userLoading, error: userError, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !id || id === null,
  });

  // Guessed player
  const {data: guessedPlayerData, refetch: refetchGuessedPlayer } = useQuery(GET_CS_PLAYER, {
    variables: { name: guess },
    skip: !guess,
  });

  // Player
  const {data: playerData} = useQuery(GET_CS_PLAYER, {
    variables: { name: randomPlayer?.getRandomPlayer.name },
  });

  // Player names
  const {data: playerNamesData, loading: playerNamesLoading, error: playerNamesError } = useQuery(GET_ALL_PLAYER_NAMES);
  const options = playerNamesData?.getAllPlayerNames.map((name: string) => ({ value: name, label: name }));

  if (playerLoading) {
    return <div>Loading...</div>;
  }
  
  if (!playerData?.getCsPlayerByName) {
    return <div>Error: Player not found</div>;
  }

  // Set player data
  const player: csPlayer = {
    id: playerData?.getCsPlayerByName.id,
    name: playerData?.getCsPlayerByName.name,
    country: playerData?.getCsPlayerByName.country,
    team: playerData?.getCsPlayerByName.team,
    age: playerData?.getCsPlayerByName.age,
    role: playerData?.getCsPlayerByName.role,
    total_winnings: playerData?.getCsPlayerByName.total_winnings,
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

    // If the guessed player is correct
    if (guessedPlayer.name === player.name) {
      setIsCorrectGuess(true);
      await refetch();
      setIsUpdatingPoints(true);
      const newPoints = userData.userById.points + 10 + remainingGuesses;
      setPointsChange(10 + remainingGuesses - guessAmount);
      await addPoints({
        variables: {
          user: {
            points: newPoints
          }
        }
      });
      await refetch()
      setIsUpdatingPoints(false);
      setShowAnswer(true);
      setShowModal(true);
    // If the guessed player is incorrect
    } else {
      setIsUpdatingPoints(true);
      setGuessAmount(prev => prev + 1);
      const newPoints = userData.userById.points - 1;
      setPointsChange(prev => prev - 1);
      await addPoints({
        variables: {
          user: {
            points: newPoints
          }
        }
      });
      await refetch();
      setIsUpdatingPoints(false);

      // Check if the user has any remaining guesses
      if (remainingGuesses === 1) {
        setShowAnswer(true);
        setShowModal(true);
      } else {
        setRemainingGuesses(prev => prev - 1);
      }
    }

    setGuesses([...guesses, guessedPlayer]);

    setGuess('');
  };

  return (
    <div className="game-container">
      <h1 className="game-title">GAME</h1>
      <p className="game-description">Welcome to the GAME.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Select
            value={options?.find((option: { value: string; label: string }) => option.value === guess)}
            onChange={(option: { value: string; label: string } | null) => setGuess(option?.value || '')}
            options={options}
            isDisabled={isUpdatingPoints}
            isSearchable
            placeholder="Enter your guess"
            styles={{
              control: (provided) => ({
                ...provided,
                width: 200,
                margin: '0 auto',
                marginBottom: 10,
                border: '2px solid #ccc',
                borderRadius: '5px',
                fontSize: 16,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? 'lightgray' : 'white',
              }),
              menu: (provided) => ({
                ...provided,
                width: 200,
                margin: '0 auto',
              }),
            }}
          />
        </div>
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
          {guesses.map((guessedPlayer, index) => (
            <tr key={index}>
              <td className={guessedPlayer.name === player.name ? 'correct-guess' : 'incorrect-guess'}>{guessedPlayer.name}</td>
              <td className={guessedPlayer.country === player.country ? 'correct-guess' : 'incorrect-guess'}>{guessedPlayer.country}</td>
              <td className={guessedPlayer.team === player.team ? 'correct-guess' : 'incorrect-guess'}>{guessedPlayer.team}</td>
              <td className={guessedPlayer.age === player.age ? 'correct-guess' : 'incorrect-guess'}>
                {guessedPlayer.age} {guessedPlayer.age === player.age ? '' : guessedPlayer.age > player.age ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </td>
              <td className={guessedPlayer.role === player.role ? 'correct-guess' : 'incorrect-guess'}>{guessedPlayer.role}</td>
              <td className={guessedPlayer.total_winnings === player.total_winnings ? 'correct-guess' : 'incorrect-guess'}>
                {guessedPlayer.total_winnings} $ {guessedPlayer.total_winnings === player.total_winnings ? '' : guessedPlayer.total_winnings > player.total_winnings ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
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
                <td className='correct-guess'>{player.name}</td>
                <td className='correct-guess'>{player.country}</td>
                <td className='correct-guess'>{player.team}</td>
                <td className='correct-guess'>{player.age}</td>
                <td className='correct-guess'>{player.role}</td>
                <td className='correct-guess'>{player.total_winnings} $</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="modal-background">
        <div className="modal">
          <button onClick={() => setShowModal(false)} className="close-button">Close</button>
          {isCorrectGuess ? (
            <div>
              <h2 className="modal-title">You WON!</h2>
              <p className="modal-text">Congratulations, you guessed correctly! The player was: {player.name}</p>
              <p className="modal-text">You got {pointsChange} points!</p>
            </div>
          ) : (
            <div>
              <h2 className="modal-title">You Lost</h2>
              <p className="modal-text">Sorry, no more guesses left. The correct player was: {player.name}</p>
              <p className="modal-text">You lost {Math.abs(pointsChange)} points</p>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}

export default Game;
