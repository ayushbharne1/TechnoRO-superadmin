import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import botImg from '../../../assets/userchat.png';
import userImg from '../../../assets/technokrateBot.png';
import { IoIosAttach } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const ChatWithUs = () => {
  const { id } = useParams(); // Get offer ID from URL

  const [messages, setMessages] = useState([
    { id: 1, sender: 'user', img: userImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:30 AM' },
    { id: 2, sender: 'bot', img: botImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:31 AM' },
    { id: 3, sender: 'user', img: userImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:32 AM' },
    { id: 4, sender: 'bot', img: botImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:33 AM' },
  ]);

  return (

<div className="flex flex-col mx-auto mt-5 bg-white p-6 md:p-10 rounded-md w-[100%]">
    {/* Header */}
      <h1 className="text-[20px] font-semibold mb-6 md:mb-8">
        Chat for Offer ID: {id}
      </h1>

      {/* Messages */}
      <div className="flex flex-col space-y-4">
        {messages.map(({ id, sender, img, text, time }) => (
          <div 
            key={id} 
            className={`flex items-start ${sender === 'user' ? 'self-start' : 'self-end'}`}
          >
            <img src={img} className="w-8 h-8 rounded-full mr-3" alt="User" />
            <div className="flex max-w-[85%] sm:max-w-[75%] bg-gray-100 p-3 rounded-lg">
              <div className="space-y-1">
                <p className="text-sm text-gray-800 break-words">{text}</p>
                <p className="text-xs text-gray-500">{time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Typing indicator */}
      <div className="flex space-x-2 items-center mt-4">
        <img src={userImg} className="w-8 h-8 rounded-full" />
        <p className="text-gray-500 text-sm flex items-center">Typing...</p>
      </div>

      {/* Input Box */}
      <div className="relative flex items-center mt-6 border rounded-lg px-3 py-2 bg-gray-100 w-full">
        <span className="absolute left-3 text-gray-500"><CiMail /></span>
        <input
          type="text"
          placeholder="Message"
          className="w-full bg-transparent focus:outline-none px-5 sm:px-6"
        />
        <button className="text-gray-500">
          <IoIosAttach className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default ChatWithUs;
