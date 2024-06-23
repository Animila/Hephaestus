import { useState } from "react";
import { useChat } from "@/contexts/chat_context";
import { SmileSVG } from "@/assets/SmileSVG";
import EmojiPicker from "emoji-picker-react";
import { PaperCLip } from "@/assets/PaperCLip";
import { SendSVG } from "@/assets/SendSVG";


export const MessageSend = () => {
  const { addMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [activeSmile, setActiveSmile] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage(newMessage.trim(), 2);
      setNewMessage('');
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage(newMessage + emojiObject.emoji);
  };

  const handleClickSmile = () => {
    setActiveSmile(!activeSmile)
  }

  return (
    <div className="flex items-center bg-white rounded-[12px] h-[8vh] mt-[5vh] p-2 relative">
      <button className="p-2">
        <div onClick={() => handleClickSmile()}>
          <SmileSVG />
        </div>
        {/* Emoji picker should appear here */}
        {activeSmile &&
        <div className="absolute sm:bottom-[50px] md:bottom-[60px] left-0">
          <EmojiPicker onEmojiClick={handleEmojiClick} pickerStyle={{ position: 'absolute', bottom: '50px' }} />
        </div>
        }
      </button>
      <button className="p-2">
        <PaperCLip />
        <input type="file" className="hidden" />
      </button>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="rounded-[8px] md:flex-1 break-words mx-2 focus:border-0 focus:outline-0"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSendMessage}
        className={`p-2 rounded-[8px] justify-center items-center flex ${newMessage.trim() ? 'bg-blue text-white' : 'bg-gray-500 text-gray-200 cursor-not-allowed'}`}
        disabled={!newMessage.trim()}
      >
        <span className="sm:hidden md:block">Отправить {' '}</span>
        <SendSVG />
      </button>
    </div>
  );
}
