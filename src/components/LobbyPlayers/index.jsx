import { RGBAToString } from '../../rgba';
import styled from 'styled-components';

const PlayersList = styled.ul`
  list-style: none;
  padding: 0;
  color: white;
`;

const PlayerDetails = styled.li.attrs((props) => ({
  style: {
    backgroundColor: props.$backgroundColor,
  },
}))`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;

  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export default function LobbyPlayers({ players }) {
  // Players is an object with each player's uuid as the key,
  // so must turn into an array before we can iterate over it.
  const playersArray = Object.entries(players);

  return (
    <PlayersList>
      {playersArray.map((player) => (
        <PlayerDetails
          key={player[0]}
          $backgroundColor={RGBAToString(player[1].color)}
        >
          <div>{player[1].name}</div>
          <div>{player[1].ready ? 'READY' : 'NOT READY'}</div>
        </PlayerDetails>
      ))}
    </PlayersList>
  );
}
