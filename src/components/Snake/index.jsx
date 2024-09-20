import { RGBAToString, generateRandomisedRGBAStrings } from '../../rgba';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
      {isAlive &&
        chunks.map((chunk, index) =>
          chunk.x === headX && chunk.y === headY ? (
            <SnakeHead
              key={index}
              $cellSize={cellSize}
              $x={chunk.x}
              $y={chunk.y}
              $dir={dir}
              $color={colors[Math.floor((colors.length - 1) * Math.random())]}
            />
          ) : (
            <SnakeChunk
              key={index}
              $cellSize={cellSize}
              $x={chunk.x}
              $y={chunk.y}
              $color={colors[Math.floor((colors.length - 1) * Math.random())]}
            />
          ),
        )}
    </>
  );
}
