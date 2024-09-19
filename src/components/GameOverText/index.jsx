import GameOverlay from '../GameOverlay';
import GameOverlayHeading from '../GameOverlayHeading';
import GameOverlayText from '../GameOverlayText';
import RandomisedColorText from '../RandomisedColorText';
import styled from 'styled-components';

function findPlayerWithLongestSnake(players) {
  return players.sort((a, b) => b.longestSnakeLength - a.longestSnakeLength)[0];
}
function findPlayerWithMostKills(players) {
  return players.sort((a, b) => b.killCount - a.killCount)[0];
}
function findPlayerWithMostDeaths(players) {
  return players.sort((a, b) => b.deathCount - a.deathCount)[0];
}

const Container = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 1em;
`;

export default function GameOverText({ gameState }) {
  const playersArray = Object.values(gameState.players);
  const longest = findPlayerWithLongestSnake(playersArray);
  const mostKills = findPlayerWithMostKills(playersArray);
  const mostDeaths = findPlayerWithMostDeaths(playersArray);

  const isSinglePlayerGame = playersArray.length === 1;

  return (
    <GameOverlay>
      {isSinglePlayerGame ? (
        <GameOverlayHeading>GAME OVER</GameOverlayHeading>
      ) : (
        <>
          <GameOverlayHeading>
            <RandomisedColorText
              color={
                Object.values(gameState.players).find(
                  (player) => player.name === gameState.lastRoundWinner,
                ).color
              }
              text={gameState.lastRoundWinner.toUpperCase()}
            />
            {' WON THE GAME'}
          </GameOverlayHeading>
          <Container>
            <GameOverlayText>
              <RandomisedColorText
                color={longest.color}
                text={`${longest.name.toUpperCase()} WAS THE LONGEST WITH ${longest.longestSnakeLength}`}
              />
            </GameOverlayText>
            <GameOverlayText>
              <RandomisedColorText
                color={mostKills.color}
                text={`${mostKills.name.toUpperCase()} WAS THE KILLIEST WITH ${mostKills.killCount} KILLS`}
              />
            </GameOverlayText>
            <GameOverlayText>
              <RandomisedColorText
                color={mostDeaths.color}
                text={`${mostDeaths.name.toUpperCase()} WAS THE DEADIEST WITH ${mostDeaths.deathCount} DEATHS`}
              />
            </GameOverlayText>
          </Container>
        </>
      )}
    </GameOverlay>
  );
}
