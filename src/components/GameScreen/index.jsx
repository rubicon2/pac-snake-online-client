import SocketContext from '../../contexts/SocketContext';
import UUIDContext from '../../contexts/UUIDContext';
import useGameState from '../../hooks/useGameState';
import Food from '../Food';
import Snake from '../Snake';
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

export default function GameScreen({ lobbyName }) {
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
        {/* Draw any overlays. */}
      </GameArea>
    </Container>
  );
}
