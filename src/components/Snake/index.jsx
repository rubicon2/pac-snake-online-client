import { RGBAToString, generateRandomisedRGBAStrings } from '../../rgba';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const DeadAnim = keyframes`
  0% { opacity: 1; }
  10% { background-color: red; }
  30% { background-color: orangered; }
  40% { background-color: white; }
  50% { background-color: darkblue; }
  100% { opacity: 0; }
`;

const VibrateAnim = keyframes`
  from { scale: 0.8; }
  to { scale: 1.1; }
`;

const deadAnims = (props) => css`
  ${DeadAnim} 500ms linear infinite, ${VibrateAnim} 40ms infinite alternate;
`;

const SnakeChunk = styled.div.attrs((props) => ({
  style: {
    left: `${props.$x * props.$cellSize}px`,
    top: `${props.$y * props.$cellSize}px`,
    backgroundColor: props.$color,
  },
}))`
  position: absolute;
  width: ${(props) => `${props.$cellSize}px`};
  height: ${(props) => `${props.$cellSize}px`};
  z-index: ${(props) => (props.$isDead ? '-1' : '0')};
  animation: ${(props) => (props.$isDead ? deadAnims : '')};
`;

const SnakeHead = styled(SnakeChunk)`
  image-rendering: pixelated;
  background-image: url('/head_1.png');
  background-size: cover;
  transform: ${(props) =>
    props.$dir === 'up'
      ? 'rotate(0deg)'
      : props.$dir === 'right'
        ? 'rotate(90deg)'
        : props.$dir === 'down'
          ? 'rotate(180deg)'
          : 'rotate(270deg)'};
`;

export default function Snake({ cellSize, player }) {
  const [colors, setColors] = useState([]);
  const { color, snake } = player;
  const { headX, headY, dir, isAlive, chunks } = snake;

  // Generate colors only when the color changes, i.e. when a game starts.
  useEffect(() => {
    setColors(generateRandomisedRGBAStrings(color));
  }, [RGBAToString(color)]);

  return (
    <>
      {chunks.map((chunk, index) =>
        chunk.x === headX && chunk.y === headY ? (
          <SnakeHead
            key={index}
            $cellSize={cellSize}
            $x={chunk.x}
            $y={chunk.y}
            $dir={dir}
            $color={colors[Math.floor((colors.length - 1) * Math.random())]}
            $isDead={!isAlive && index === chunks.length - 1}
          />
        ) : (
          <SnakeChunk
            key={index}
            $cellSize={cellSize}
            $x={chunk.x}
            $y={chunk.y}
            $color={colors[Math.floor((colors.length - 1) * Math.random())]}
            $isDead={!isAlive && index === chunks.length - 1}
          />
        ),
      )}
    </>
  );
}
