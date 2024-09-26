import { useState, useEffect } from 'react';

export default function useUUID(socket) {
  const [uuid, setUuid] = useState(null);

  function handleUUIDReceived(new_uuid) {
    setUuid(new_uuid);
  }

  useEffect(() => {
    if (socket) {
      socket.emit('opened', uuid);
      socket.on('uuid_received', handleUUIDReceived);
    }

    return () => {
      if (socket) {
        socket.off('uuid_received', handleUUIDReceived);
      }
    };
  }, [socket]);

  return uuid;
}
