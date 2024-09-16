export default function LobbyPlayers({ players }) {
  // Players is an object with each player's uuid as the key,
  // so must turn into an array before we can iterate over it.
  const playersArray = Object.entries(players);

  return (
    <ul>
      {playersArray.map((player) => (
        <li key={player[0]}>
          {player[1].name} - {player[1].ready ? 'READY' : 'NOT READY'}
        </li>
      ))}
    </ul>
  );
}
