import { useState, useEffect, useRef } from 'react';

export default function useMessages(socket) {
  const [messages, setMessages] = useState([]);
  const existingMessages = useRef([]);

  // Doesn't append to messages state array properly if it is in the useEffect function... why?
  // It was because the callback passed to socket.on() used the constant value when useMessages is first called - an empty array.
  // It does not get the updated version when setMessages is called. It would only get a new version if the socket changes and
  // the useEffect runs again. Have used a ref to get around this, to get the latest value, but setMessages is still required
  // for the dependent components to rerender with the new message. This is clunky and dodgy and there must be a better way to do it.
  useEffect(() => {
    if (socket) {
      socket.on('message_received', (message) => {
        const time = new Date(Date.now()).toLocaleTimeString();
        const newMessage = `${time} - ${message}`;
        existingMessages.current.unshift(newMessage);
        // Limit to five messages.
        while (existingMessages.current.length > 5)
          existingMessages.current.pop();
        setMessages(existingMessages.current);
      });
    }
  }, [socket]);

  return messages;
}
