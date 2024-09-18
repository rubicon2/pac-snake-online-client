import { useState, useEffect } from 'react';

export default function useMessages(socket) {
  const [messages, setMessages] = useState([]);

  // Why does this work ok here, but not in a useEffect function?
  // if (socket) {
  //   socket.on('message_received', (message) => {
  //     const time = new Date(Date.now()).toLocaleTimeString();
  //     const newMessage = `${time} - ${message}`;
  //     setMessages([
  //       newMessage,
  //       ...messages.filter((message, index) => index < 5),
  //     ]);
  //   });
  // }

  useEffect(() => {
    if (socket) {
      socket.on('message_received', (message) => {
        const time = new Date(Date.now()).toLocaleTimeString();
        const newMessage = `${time} - ${message}`;
        setMessages([
          newMessage,
          ...messages.filter((message, index) => index < 5),
        ]);
      });
    }
  }, [socket]);

  return messages;
}
