import { createContext, useContext, useState } from "react";
import { useAuth } from "@/contexts/auth_context";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const {user} = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'message',
      sender_id: 2,
      receiver_id: 1,
      has_files: false,
      timestamp: '2024-06-23 12:23:34',
      files: []
    }
  ])

  const addMessage = (content, user_id, files = null) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      sender_id: user.id,
      receiver_id: user_id, // Assuming 2 is the id of the other person
      has_files: files !== null,
      timestamp: new Date().toISOString(),
      files: []
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, setMessages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
export const useChat = () => useContext(ChatContext);