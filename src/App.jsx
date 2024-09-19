import useSocket from './hooks/useSocket';
import useUUID from './hooks/useUUID';
import useClientMetadata from './hooks/useClientMetadata';
import useLobbyList from './hooks/useLobbyList';
import AppDataProvider from './components/AppDataProvider';
import LobbyScreen from './components/LobbyScreen';
import GameScreen from './components/GameScreen';

function App() {
  // I'd really like it if we could have this in some kind of environment variable,
  // but when this client dist version is built, the vite env variable gets baked in.

  // A socket is created here and passed down via context, as we want one socket for the whole application.
  // If we called useSocket everywhere we wanted to use a socket, we would end up creating a whole bunch of sockets.
  // const socket = useSocket('http://localhost:25565');
  const socket = useSocket('https://pac-snake-online.adaptable.app:443');
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
      {isPlayerInRunningGame ? <GameScreen /> : <LobbyScreen />}
    </AppDataProvider>
  );
}

export default App;
