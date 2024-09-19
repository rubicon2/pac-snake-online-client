import { useContext } from 'react';
import UUIDContext from '../../contexts/UUIDContext';
import SocketContext from '../../contexts/SocketContext';
import LobbyListContext from '../../contexts/LobbyListContext';
import CenteredContainer from '../CenteredContainer';
import LobbyDetails from '../LobbyDetails';
import Messages from '../Messages';

export default function LobbyScreen() {
  const lobbyList = useContext(LobbyListContext);
  const socket = useContext(SocketContext);
  const uuid = useContext(UUIDContext);

  const lobbyArray = Object.values(lobbyList);

  function handleNameSubmit(event) {
    event.preventDefault();
    const { client_name } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    socket.emit('name_change_requested', uuid, client_name);
  }

  function handleLobbySubmit(event) {
    event.preventDefault();
    const { lobby_name } = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    socket.emit('new_lobby_requested', uuid, lobby_name);
  }

  function handleReady(event) {
    event.preventDefault();
    socket.emit('player_ready_changed', uuid, true);
  }

  function handleNotReady(event) {
    event.preventDefault();
    socket.emit('player_ready_changed', uuid, false);
  }

  return (
    <CenteredContainer>
      <h1>Pac-Snake Online</h1>
      <div>
        <button type="button" onClick={handleReady}>
          Ready
        </button>
        <button type="button" onClick={handleNotReady}>
          Not Ready
        </button>
      </div>
      <div>
        <form onSubmit={handleNameSubmit}>
          <label htmlFor="client-name">Player:</label>
          <input id="client-name" name="client_name" />
          <button type="submit">Set Name</button>
        </form>
        <form onSubmit={handleLobbySubmit}>
          <label htmlFor="lobby-name">Lobby:</label>
          <input id="lobby-name" name="lobby_name" />
          <button type="submit">Create Lobby</button>
        </form>
      </div>
      <ul>
        {lobbyArray.map((lobby) => (
          <li key={lobby.lobby_name}>
            <LobbyDetails lobby={lobby} />
          </li>
        ))}
      </ul>
      <Messages />
    </CenteredContainer>
  );
}
