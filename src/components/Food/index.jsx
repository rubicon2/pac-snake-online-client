import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { generateRandomisedRGBAStrings } from '../../rgba';

const FoodChunk = styled.div.attrs((props) => ({
  style: {
    left: `${props.$x * props.$cellSize + props.$cellSize * 0.3125}px`,
    top: `${props.$y * props.$cellSize + props.$cellSize * 0.3125}px`,
    backgroundColor: props.$backgroundColor,
  },
}))`
  position: absolute;
  width: ${(props) => `${props.$cellSize * 0.375}px`};
  height: ${(props) => `${props.$cellSize * 0.375}px`};
  animation: spin 2s linear 0ms infinite;

  @keyframes spin {
    from {
      transform: rotate(0);
      scale: 0.8;
    }
    50% {
      scale: 0.9;
    }
    to {
      transform: rotate(180deg);
      scale: 0.8;
    }
  }
`;

export default function Food({ cellSize, x = 0, y = 0 }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(generateRandomisedRGBAStrings({ r: 30, g: 230, b: 30, a: 1 }));
  }, []);

  return (
    <FoodChunk
      $cellSize={cellSize}
      $x={x}
      $y={y}
      $backgroundColor={colors[Math.floor((colors.length - 1) * Math.random())]}
    />
  );
}
