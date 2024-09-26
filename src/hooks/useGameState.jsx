import { useState, useEffect } from 'react';

export default function useGameState(socket) {
  const [gameState, setGameState] = useState(null);

  function updateGameState(data) {
    setGameState(data);
  }

  // Want this to only run if the socket has changed.
  useEffect(() => {
    if (socket) {
      socket.on('game_started', updateGameState);
      socket.on('game_round_started', updateGameState);
      socket.on('game_round_countdown_started', updateGameState);
      socket.on('game_round_countdown_updated', updateGameState);
      socket.on('game_state_updated', updateGameState);
      socket.on('game_round_ended', updateGameState);
      socket.on('game_round_failed', updateGameState);
      socket.on('game_over', updateGameState);
      socket.on('single_player_game_over', updateGameState);
      socket.on('game_ended', updateGameState);

      // Unsubscribe from game events on unmount, before going back to lobby screen.
      return () => {
        socket.off('game_started', updateGameState);
        socket.off('game_round_started', updateGameState);
        socket.off('game_round_countdown_started', updateGameState);
        socket.off('game_round_countdown_updated', updateGameState);
        socket.off('game_state_updated', updateGameState);
        socket.off('game_round_ended', updateGameState);
        socket.off('game_round_failed', updateGameState);
        socket.off('game_over', updateGameState);
        socket.off('single_player_game_over', updateGameState);
        socket.off('game_ended', updateGameState);
      };
    }
  }, [socket]);

  return gameState;
}
