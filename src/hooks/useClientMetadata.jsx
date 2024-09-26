import { useEffect, useState } from 'react';

export default function useClientMetadata(socket, uuid) {
  const [clientMetadata, setClientMetadata] = useState(null);

  function handleClientDataUpdate(data) {
    setClientMetadata(data);
  }

  useEffect(() => {
    if (socket && uuid) {
      socket.emit('client_data_update_requested', uuid);
      socket.on('client_data_updated', handleClientDataUpdate);
    }

    return () => {
      if (socket && uuid) {
        socket.off('client_data_updated', handleClientDataUpdate);
      }
    };
  }, [socket, uuid]);

  return clientMetadata;
}
