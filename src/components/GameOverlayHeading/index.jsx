import styled from 'styled-components';

const Text = styled.span`
  font-size: 4.5rem;
  color: white;
  text-align: center;
`;

export default function GameOverlayHeading({ children }) {
  return <Text>{children}</Text>;
}
