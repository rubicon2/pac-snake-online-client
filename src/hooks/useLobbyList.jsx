import { useState, useEffect } from 'react';

export default function useLobbyList(socket) {
  const [lobbyList, setLobbyList] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('lobby_list_updated', (updatedLobbyList) => {
        setLobbyList(updatedLobbyList);
      });
    }
  }, [socket]);

  return lobbyList;
}
