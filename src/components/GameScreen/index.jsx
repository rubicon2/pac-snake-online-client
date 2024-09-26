import SocketContext from '../../contexts/SocketContext';
import UUIDContext from '../../contexts/UUIDContext';
import useGameState from '../../hooks/useGameState';

import Food from '../Food';
import Snake from '../Snake';
import GameOverlay from '../GameOverlay';
import GameOverlayHeading from '../GameOverlayHeading';
import GameOverText from '../GameOverText';
import RandomisedColorText from '../RandomisedColorText';

import { useContext, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const GameArea = styled.div`
  position: relative;
  isolation: isolate;
  background-color: black;
  width: ${(props) => `${props.$cellSize * props.$gridSize}px`};
  height: ${(props) => `${props.$cellSize * props.$gridSize}px`};
`;

const CELL_SIZE = 80;

export default function GameScreen() {
  const socket = useContext(SocketContext);
  const uuid = useContext(UUIDContext);
  const gameState = useGameState(socket);

  // Listen for player inputs, send messages through socket.
  useEffect(() => {
    function handleInput(dir) {
      socket.emit('player_direction_changed', uuid, dir);
    }

    addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      switch (key) {
        case 'w': {
          handleInput('up');
          break;
        }

        case 'a': {
          handleInput('left');
          break;
        }

        case 's': {
          handleInput('down');
          break;
        }

        case 'd': {
          handleInput('right');
          break;
        }
      }
    });

    // Stop listening for keyboard input on unmount, i.e. when game ends.
    return () => removeEventListener('keydown', handleInput);
  }, [socket]);

  let players = [];
  if (gameState) {
    players = Object.values(gameState.players).sort(
      (a, b) => a.snake.chunks.length < b.snake.chunks.length,
    );

    // DOESN'T WORK PROPERLY ON CHROME FOR SOME REASON.
    let lastPlayer = null;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (lastPlayer) {
        if (player.snake.chunks.length < lastPlayer.snake.chunks.length) {
          // If this player is shorter than the last, they will have the next lower level of snake face.
          player.img = lastPlayer.img + 1;
        } else {
          // Otherwise they will have the same snake face - they are the same length.
          player.img = lastPlayer.img;
        }
      } else {
        // If there is no lastPlayer, this must be the first one.
        // As we sorted them by snake length before this process, it will be the longest.
        players[i].img = 0;
      }
      lastPlayer = player;
    }
  }

  return gameState === null ? (
    <Container>
      <GameArea $cellSize={CELL_SIZE} $gridSize={10} />
    </Container>
  ) : (
    <Container>
      <GameArea
        $cellSize={CELL_SIZE}
        $gridSize={gameState.maxPos - gameState.minPos}
      >
        {gameState.foodPickups.map((foodPickup, index) => (
          <Food
            key={index}
            cellSize={CELL_SIZE}
            x={foodPickup.x}
            y={foodPickup.y}
          />
        ))}
        {players.map((player, index) => (
          <Snake key={index} cellSize={CELL_SIZE} player={player} />
        ))}
        {gameState.state === 'countdown' && (
          <GameOverlay>
            <GameOverlayHeading key={gameState.countdownValue}>
              {gameState.countdownValue <= 0
                ? 'GO!'
                : gameState.countdownValue > 3
                  ? ''
                  : Math.min(gameState.countdownValue, 3)}
            </GameOverlayHeading>
          </GameOverlay>
        )}
        {gameState.state === 'round_failed' && (
          <GameOverlay>
            <GameOverlayHeading>NO ONE WON THE ROUND!</GameOverlayHeading>
          </GameOverlay>
        )}
        {gameState.state === 'round_over' && (
          <GameOverlay>
            <GameOverlayHeading>
              <RandomisedColorText
                color={
                  Object.values(gameState.players).find(
                    (player) => player.name === gameState.lastRoundWinner,
                  ).color
                }
                text={gameState.lastRoundWinner.toUpperCase()}
              />
              {' WON THE ROUND'}
            </GameOverlayHeading>
          </GameOverlay>
        )}
        {gameState.state === 'game_over' && (
          <GameOverText gameState={gameState} />
        )}
      </GameArea>
    </Container>
  );
}
