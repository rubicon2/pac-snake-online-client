import { useState, useEffect } from 'react';

export default function useUUID(socket) {
  const [uuid, setUuid] = useState('default-uuid');

  useEffect(() => {
    if (socket) {
      socket.emit('opened', uuid);
      socket.on('uuid_received', (new_uuid) => {
        setUuid(new_uuid);
      });
    }
  }, [socket]);

  return uuid;
}
