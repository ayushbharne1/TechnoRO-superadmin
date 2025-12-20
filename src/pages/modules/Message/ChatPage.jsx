
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Header2 from "../../../components/superAdmin/header/Header2";
import userImg1 from "../../../assets/avatar1.jpg"; 
import userImg2 from "../../../assets/avatar2.jpg";

const ChatPage = () => {
  const location = useLocation();
  const { id,userType, user } = location.state || {};
  console.log(id, user, userType);
  const [messages, setMessages] = useState([
    { sender: "other", text: "Hello! How are you?", time: "06:34 AM" },
    { sender: "me", text: "Hi! I'm good, thanks. How about you?", time: "06:35 AM" },
    { sender: "other", text: "Doing well! Ready for the update?", time: "06:36 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([...messages, { sender: "me", text: newMessage, time }]);
    setNewMessage("");
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#F9FAFB] flex flex-col">
      <Header2 />

      {/* Chat partner name */}
      <div className="px-6 py-4 font-semibold text-gray-800 text-[24px] ">
        {user || "Unknown User"}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} items-end gap-4`}
          >
            {msg.sender === "other" && (
              <img src={userImg1} alt="user" className="w-12 h-12 rounded-full" />
            )}
            <div
              className={`p-5 rounded-xl max-w-lg text-white text-lg ${
                msg.sender === "me" ? "bg-blue-500" : "bg-[#A87C5C]"
              }`}
            >
              <p className="text-base">{msg.text}</p>
              <span className="text-sm text-gray-200">{msg.time}</span>
            </div>
            {msg.sender === "me" && (
              <img src={userImg2} alt="me" className="w-12 h-12 rounded-full" />
            )}
          </div>
        ))}

        {/* Typing indicator */}
        <div className="text-gray-500 text-base">Typing...</div>
      </div>

      {/* Message input */}
      <div className="px-6 py-4 flex gap-3">
        <input
          type="text"
          placeholder="Type Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#0B3366]"
        />
        <button
          onClick={handleSend}
          className="bg-[#7EC1B1] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#6aafa0]"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
