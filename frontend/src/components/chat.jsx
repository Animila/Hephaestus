import React from "react";
import { useChat } from "@/contexts/chat_context";
import { useAuth } from "@/contexts/auth_context";

export const Chat = () => {
  const {user} = useAuth()
  const { messages } = useChat()

  const getFormattedDate = timestamp => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера'
    } else {
      return date.toLocaleDateString()
    }
  }

  return <div className="md:col-span-12 sm:md:col-span-1 bg-white rounded-[8px] h-[54vh] pb-[32px] px-[20px] flex flex-col overflow-y-scroll">
    {messages.map((message, index) =>
      <React.Fragment key={message.id}>
        {index === 0 ||
        new Date(messages[index - 1].created_at).toDateString() !==
        new Date(message.created_at).toDateString() ? (
          <>
            <div className="text-center my-2">
              {getFormattedDate(message.timestamp)}
            </div>
          </>) : null}
          <div className={`flex flex-col ${message.sender_id === user.id ? "items-end" : "items-start"}`}>
            <div className="text-sm mb-1">
              {message.sender_id === user.id ? "Вы" : "Техподдержка"}
            </div>
            <div
              className={`max-w-[70%] p-2 mb-2 rounded-[8px] text-lg text-wrap flex-wrap break-words ${message.sender_id === user.id ? "bg-blue text-white text-right" : "bg-gray-300 text-black"}`}>
              {message.content}
              <div className="text-xs mt-1">
                {new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}
              </div>
            </div>
          </div>

      </React.Fragment>
    )}
  </div>
}