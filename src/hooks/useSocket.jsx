import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const HTTP_TIMEOUT_MS = parseInt(import.meta.env.VITE_SERVER_HTTP_TIMEOUT_MS);

export default function useSocket(url) {
  const [socket, setSocket] = useState(null);
  const oldSocket = useRef(null);
  const reconnectTimeout = useRef(null);

  // Platform as a service will have a set http timeout.
  // The purpose of this is to set up a new socket before the old one times out,
  // then replace the old socket with the new one, once it is all set up and ready to go.
  // This should reduce (or, hopefully, eliminate) lag when the http timeout occurs.
  function connect() {
    const newSocket = io(url);
    newSocket.on('connect', () => {
      if (oldSocket.current) oldSocket.current.close();
      oldSocket.current = newSocket;
      // Trigger rerender, so any components that use this hook will have the new socket.
      setSocket(newSocket);
      reconnectTimeout.current = setTimeout(connect, HTTP_TIMEOUT_MS);
    });
  }

  useEffect(() => {
    connect();

    return () => {
      if (oldSocket.current) oldSocket.current.close();
      oldSocket.current = null;
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    };
  }, [url]);

  return socket;
}
