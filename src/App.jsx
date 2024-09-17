import useSocket from './hooks/useSocket';
import useUUID from './hooks/useUUID';
import useClientMetadata from './hooks/useClientMetadata';
import useGameState from './hooks/useGameState';
import useLobbyList from './hooks/useLobbyList';
import AppDataProvider from './components/AppDataProvider';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';
import './App.css';

function App() {
  const socket = useSocket(import.meta.env.VITE_SERVER_URL);
  const uuid = useUUID(socket);
  const clientMetadata = useClientMetadata(socket, uuid);
  const gameState = useGameState(socket);
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
    <AppDataProvider
      socket={socket}
      uuid={uuid}
      lobbyList={lobbyList}
      gameState={gameState}
    >
      {isPlayerInRunningGame ? <GameScreen /> : <LobbyScreen />}
    </AppDataProvider>
  );
}

export default App;
