import { useEffect, useState } from 'react';

export default function useClientMetadata(socket, uuid) {
  const [clientMetadata, setClientMetadata] = useState(null);

  useEffect(() => {
    if (socket && uuid) {
      socket.emit('client_data_update_requested', uuid);
      socket.on('client_data_updated', (updatedClientMetadata) => {
        setClientMetadata(updatedClientMetadata);
      });
    }
  }, [socket, uuid]);

  return clientMetadata;
}
