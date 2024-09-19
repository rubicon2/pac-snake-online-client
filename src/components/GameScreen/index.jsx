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
      const { key } = event;
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
        {Object.values(gameState.players).map((player, index) => (
          <Snake key={index} cellSize={CELL_SIZE} player={player} />
        ))}
        {gameState.state === 'countdown' && (
          <GameOverlay>
            <GameOverlayHeading>{gameState.countdownValue}</GameOverlayHeading>
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
