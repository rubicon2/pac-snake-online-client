import styled from 'styled-components';

const Overlay = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 2rem;
  /* To ensure visibility of any coloured text against a player in the background. */
  text-shadow: 1px 1px 10px black;
  /* Stop user selecting any child text. */
  user-select: none;
  overflow: hidden;
`;

export default function GameOverlay({ children }) {
  return <Overlay>{children}</Overlay>;
}
