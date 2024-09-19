import { useContext } from 'react';
import SocketContext from '../../contexts/SocketContext';
import useMessages from '../../hooks/useMessages';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function Messages() {
  const socket = useContext(SocketContext);
  const messages = useMessages(socket);

  return (
    <div>
      <List>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </List>
    </div>
  );
}
