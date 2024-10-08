import head_01 from '/head_1.png';
import head_02 from '/head_2.png';
import head_03 from '/head_3.png';
import head_04 from '/head_4.png';

import { RGBAToString, generateRandomisedRGBAStrings } from '../../rgba';
import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const DeadAnim = keyframes`
  10% { background-color: red; }
  30% { background-color: orangered; }
  40% { background-color: white; }
  50% { background-color: darkblue; }
`;

const VibrateAnim = keyframes`
  from { scale: 0.8; }
  to { scale: 1.1; }
`;

const FadeAnim = keyframes`
  from { opacity: 1; }
  to { opacity: 0 };
`;

const deadAnims = (props) => css`
  ${DeadAnim} 500ms ${props.$animDelay} linear infinite,
  ${VibrateAnim} 40ms ${props.$animDelay} infinite alternate,
  ${FadeAnim} 1s ${props.$animDelay} linear 1 forwards;
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
  background-image: ${(props) => `url(${props.$headImg})`};
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

const snakeHeads = [head_01, head_02, head_03, head_04];

export default function Snake({ cellSize, player }) {
  const [colors, setColors] = useState([]);
  const { color, snake, img } = player;
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
            $headImg={snakeHeads[img]}
            $isDead={!isAlive}
            $animDelay={`${index * 300}ms`}
          />
        ) : (
          <SnakeChunk
            key={index}
            $cellSize={cellSize}
            $x={chunk.x}
            $y={chunk.y}
            $color={colors[Math.floor((colors.length - 1) * Math.random())]}
            $isDead={!isAlive}
            $animDelay={`${index * 300}ms`}
          />
        ),
      )}
    </>
  );
}
