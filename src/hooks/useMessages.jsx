import { useState, useEffect } from 'react';

export default function useMessages(socket) {
  const [messages, setMessages] = useState([]);

  // Why does this work ok here, but not in a useEffect function?
  // This adds a ridiculous number of 'message_received' callbacks to the socket, as expected!
  // But why does it work anyway?
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

  // Doesn't append to messages state array properly if it is in the useEffect function... why?
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
