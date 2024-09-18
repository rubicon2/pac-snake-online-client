import { randomiseRGBA, RGBAToString } from '../../rgba';
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
  const { color, snake } = player;
  const { headX, headY, dir, isAlive, chunks } = snake;
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
              $color={RGBAToString(randomiseRGBA(color))}
            />
          ) : (
            <SnakeChunk
              key={index}
              $cellSize={cellSize}
              $x={chunk.x}
              $y={chunk.y}
              $color={RGBAToString(randomiseRGBA(color))}
            />
          ),
        )}
    </>
  );
}
