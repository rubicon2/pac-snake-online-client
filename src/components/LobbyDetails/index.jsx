import LobbyPlayers from '../LobbyPlayers';
import SocketContext from '../../contexts/SocketContext';
import UUIDContext from '../../contexts/UUIDContext';
import SpacedFlexContainer from '../SpacedFlexContainer';
import LobbyButton from '../LobbyButton';

import { useContext } from 'react';
import styled from 'styled-components';

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LobbyName = styled.h2`
  margin: 0;
`;

const LobbyStatus = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
    <LobbyContainer>
      <LobbyName>{lobby_name}</LobbyName>
      <LobbyStatus>
        <div>
          {player_count}/4 -{' '}
          {lobby_state !== 'lobby'
            ? 'RUNNING'
            : player_count === 4
              ? 'NOT JOINABLE'
              : 'JOINABLE'}
        </div>
        <SpacedFlexContainer>
          {playerIsInLobby ? (
            <LobbyButton onClick={handleLobbyLeave}>Leave</LobbyButton>
          ) : (
            <LobbyButton onClick={handleLobbyJoin}>Join</LobbyButton>
          )}
          <LobbyButton onClick={handleLobbyDelete} disabled={player_count > 0}>
            Close
          </LobbyButton>
          <LobbyButton onClick={handleSpeedChange}>
            {lobby_speed.name}
          </LobbyButton>
        </SpacedFlexContainer>
      </LobbyStatus>
      <LobbyPlayers players={players} />
    </LobbyContainer>
  );
}
