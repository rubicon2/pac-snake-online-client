import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 1.5rem;
`;

const Title = styled.h1`
  margin: 0;
`;

const List = styled.ul`
  margin: 0;
`;

export default function Instructions() {
  return (
    <Container>
      <Title as={'h2'}>How to Play</Title>
      <List>
        <li>To move, use WASD.</li>
        <li>
          By moving through the edge of the play area, you can loop to the other
          side.
        </li>
        <li>The last snake standing wins the round.</li>
        <li>The first player to win 3 rounds wins the game!</li>
        <li>Eat food to grow your snake.</li>
        <li>In a head on collision, the longest snake will win.</li>
        <li>Scoff food, become a beast, and hunt your foes!</li>
      </List>
    </Container>
  );
}
