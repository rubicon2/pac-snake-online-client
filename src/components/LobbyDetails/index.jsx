import { useContext } from 'react';
import LobbyPlayers from '../LobbyPlayers';
import SocketContext from '../../contexts/SocketContext';
import UUIDContext from '../../contexts/UUIDContext';

export default function LobbyDetails({ lobby }) {
  const socket = useContext(SocketContext);
  const uuid = useContext(UUIDContext);
  const { lobby_name, lobby_state, lobby_speed, player_count, players } = lobby;
  const playerIsInLobby = Object.keys(players).includes(uuid);

  function handleSpeedChange(event) {
    event.preventDefault();
    socket.emit('change_lobby_speed_requested', uuid, lobby_name);
  }

  function handleLobbyLeave(event) {
    event.preventDefault();
    socket.emit('player_leave_lobby_requested', uuid);
  }

  function handleLobbyJoin(event) {
    event.preventDefault();
    socket.emit('player_join_lobby_requested', uuid, lobby_name);
  }

  function handleLobbyDelete(event) {
    event.preventDefault();
    socket.emit('close_lobby_requested', uuid, lobby_name);
  }

  return (
    <div>
      <h2>{lobby_name}</h2>
      <p>
        {player_count}/4 -{' '}
        {lobby_state !== 'lobby'
          ? 'RUNNING'
          : player_count === 4
            ? 'NOT JOINABLE'
            : 'JOINABLE'}
      </p>
      <LobbyPlayers players={players} />
      {playerIsInLobby ? (
        <button type="button" onClick={handleLobbyLeave}>
          Leave
        </button>
      ) : (
        <button type="button" onClick={handleLobbyJoin}>
          Join
        </button>
      )}
      <button
        type="button"
        onClick={handleLobbyDelete}
        disabled={player_count > 0}
      >
        Close
      </button>
      <button type="button" onClick={handleSpeedChange}>
        {lobby_speed.name}
      </button>
    </div>
  );
}
