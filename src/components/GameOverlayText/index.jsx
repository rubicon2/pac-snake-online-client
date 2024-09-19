import styled from 'styled-components';

const Text = styled.div`
  font-size: 2rem;
  color: white;
`;

export default function GameOverlayText({ children }) {
  return <Text>{children}</Text>;
}
