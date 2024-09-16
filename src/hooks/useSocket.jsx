import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(url));
    return () => {
      setSocket(null);
    };
  }, [url]);

  return socket;
}
