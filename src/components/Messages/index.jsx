import { useContext } from 'react';
import SocketContext from '../../contexts/SocketContext';
import useMessages from '../../hooks/useMessages';

export default function Messages() {
  const socket = useContext(SocketContext);
  const messages = useMessages(socket);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
