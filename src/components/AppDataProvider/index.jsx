import SocketContext from '../../contexts/SocketContext';
import UUIDContext from '../../contexts/UUIDContext';
import GameStateContext from '../../contexts/GameStateContext';
import LobbyListContext from '../../contexts/LobbyListContext';

export default function AppDataProvider({
  children,
  socket,
  uuid,
  gameState,
  lobbyList,
}) {
  return (
    <SocketContext.Provider value={socket}>
      <UUIDContext.Provider value={uuid}>
        <GameStateContext.Provider value={gameState}>
          <LobbyListContext.Provider value={lobbyList}>
            {children}
          </LobbyListContext.Provider>
        </GameStateContext.Provider>
      </UUIDContext.Provider>
    </SocketContext.Provider>
  );
}
