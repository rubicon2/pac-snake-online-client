import useSocket from './hooks/useSocket';
import useUUID from './hooks/useUUID';
import useClientMetadata from './hooks/useClientMetadata';
import useLobbyList from './hooks/useLobbyList';
import AppDataProvider from './components/AppDataProvider';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import './App.css';

function App() {
  const socket = useSocket(import.meta.env.VITE_SERVER_URL);
  const uuid = useUUID(socket);
  const clientMetadata = useClientMetadata(socket, uuid);

  // Can move this to LobbyScreen later probably, as the game screen doesn't care about the lobby info.
  const lobbyList = useLobbyList(socket);

  let isPlayerInRunningGame = false;
  if (lobbyList && clientMetadata) {
    if (
      clientMetadata.lobby &&
      lobbyList[clientMetadata.lobby].lobby_state !== 'lobby'
    )
      isPlayerInRunningGame = true;
  }

  return (
    <AppDataProvider socket={socket} uuid={uuid} lobbyList={lobbyList}>
      {isPlayerInRunningGame ? (
        <GameScreen lobbyName={clientMetadata.lobby} />
      ) : (
        <LobbyScreen />
      )}
    </AppDataProvider>
  );
}

export default App;
