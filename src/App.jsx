import useSocket from './hooks/useSocket';
import useUUID from './hooks/useUUID';
import useGameState from './hooks/useGameState';
import useLobbyList from './hooks/useLobbyList';
import AppDataProvider from './components/AppDataProvider';
import './App.css';

function App() {
  const socket = useSocket(import.meta.env.VITE_SERVER_URL);
  const uuid = useUUID(socket);
  const gameState = useGameState(socket);
  const lobbyList = useLobbyList(socket);

  return (
    <AppDataProvider
      socket={socket}
      uuid={uuid}
      lobbyList={lobbyList}
      gameState={gameState}
    >
      <LobbyScreen />
    </AppDataProvider>
  );
}

export default App;
