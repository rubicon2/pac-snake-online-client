import { useState, useEffect } from 'react';

export default function useGameState(socket) {
  const [gameState, setGameState] = useState(null);

  // Want this to only run if the socket is changed.
  useEffect(() => {
    if (socket) {
      socket.on('game_state_updated', (updatedGameState) => {
        setGameState(updatedGameState);
      });
    }
  }, [socket]);

  return gameState;
}
