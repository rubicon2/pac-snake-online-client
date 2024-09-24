import UUIDContext from '../../contexts/UUIDContext';
import SocketContext from '../../contexts/SocketContext';
import LobbyListContext from '../../contexts/LobbyListContext';

import CenteredContainer from '../CenteredContainer';
import SpacedFlexContainer from '../SpacedFlexContainer';
import VerticalSeparator from '../VerticalSeparator';
import Instructions from '../GameInstructions';
import LobbyDetails from '../LobbyDetails';
import LobbyButton from '../LobbyButton';
import Messages from '../Messages';

import { useContext } from 'react';
import styled from 'styled-components';

const SpacedVerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: end;
  align-items: end;
`;

const LobbyList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5em;
`;

const GameTitle = styled.h1`
  margin: 0;
  padding: 1rem 0;
`;

const Flex = styled.div`
  display: flex;
  gap: 1rem;
`;

const PlayerDetails = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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
      <GameTitle>Pac-Snake Online</GameTitle>
      <Flex>
        <Instructions />
        <PlayerDetails>
          <SpacedVerticalFlex>
            <SpacedFlexContainer>
              <LobbyButton onClick={handleReady}>Ready</LobbyButton>
              <LobbyButton onClick={handleNotReady}>Not Ready</LobbyButton>
            </SpacedFlexContainer>
            <SpacedVerticalFlex>
              <form onSubmit={handleNameSubmit}>
                <SpacedFlexContainer>
                  <label htmlFor="client-name">Player:</label>
                  <Input
                    id="client-name"
                    name="client_name"
                    autoComplete="off"
                  />
                  <LobbyButton type="submit">Set Name</LobbyButton>
                </SpacedFlexContainer>
              </form>
              <form onSubmit={handleLobbySubmit}>
                <SpacedFlexContainer>
                  <label htmlFor="lobby-name">Lobby:</label>
                  <Input id="lobby-name" name="lobby_name" autoComplete="off" />
                  <LobbyButton type="submit">Create Lobby</LobbyButton>
                </SpacedFlexContainer>
              </form>
            </SpacedVerticalFlex>
          </SpacedVerticalFlex>
        </PlayerDetails>
      </Flex>
      <LobbyList>
        {lobbyArray.map((lobby, index) => (
          <>
            <li key={lobby.lobby_name}>
              <LobbyDetails lobby={lobby} />
            </li>
            <VerticalSeparator />
          </>
        ))}
      </LobbyList>
      <Messages />
    </CenteredContainer>
  );
}
