import styled, { keyframes } from 'styled-components';

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(2.5);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Text = styled.span`
  font-size: 4.5rem;
  color: white;
  text-align: center;
  animation: ${FadeIn} 0.5s ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`;

export default function GameOverlayHeading({ children }) {
  return <Text>{children}</Text>;
}
