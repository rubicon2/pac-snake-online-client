import { useState, useEffect } from 'react';

export default function useLobbyList(socket) {
  const [lobbyList, setLobbyList] = useState([]);

  function handleLobbyListUpdate(data) {
    setLobbyList(data);
  }

  useEffect(() => {
    if (socket) {
      socket.emit('lobby_list_update_requested');
      socket.on('lobby_list_updated', handleLobbyListUpdate);
    }

    return () => {
      if (socket) {
        socket.off('lobby_list_updated', handleLobbyListUpdate);
      }
    };
  }, [socket]);

  return lobbyList;
}
