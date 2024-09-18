import styled from 'styled-components';

const FoodChunk = styled.div.attrs((props) => ({
  style: {
    left: `${props.$x * props.$cellSize + props.$cellSize * 0.3125}px`,
    top: `${props.$y * props.$cellSize + props.$cellSize * 0.3125}px`,
  },
}))`
  position: absolute;
  background-color: green;
  width: ${(props) => `${props.$cellSize * 0.375}px`};
  height: ${(props) => `${props.$cellSize * 0.375}px`};
`;

export default function Food({ cellSize, x = 0, y = 0 }) {
  return <FoodChunk $cellSize={cellSize} $x={x} $y={y} />;
}
