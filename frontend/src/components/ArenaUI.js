import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameState, joinGame, leaveGame } from '../redux/gameReducer';
import { gameState } from '../redux/store';

const ArenaUI = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameState);
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    dispatch(fetchGameState());
  }, [dispatch]);

  const handleJoinGame = (gameId) => {
    dispatch(joinGame(gameId));
    setCurrentGame(gameId);
  };

  const handleLeaveGame = () => {
    dispatch(leaveGame(currentGame));
    setCurrentGame(null);
  };

  return (
    <div id="gameContainer">
      <h1>The Arena</h1>
      {gameData.games.map((game) => (
        <div key={game.id}>
          <h2>{game.name}</h2>
          <p>{game.description}</p>
          {currentGame === game.id ? (
            <button onClick={handleLeaveGame}>Leave Game</button>
          ) : (
            <button onClick={() => handleJoinGame(game.id)}>Join Game</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArenaUI;