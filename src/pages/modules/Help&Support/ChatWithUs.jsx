import React, { useState } from 'react';
import botImg from '../../assets/userchat.png';
import userImg from '../../assets/technokrateBot.png';
import { IoIosAttach } from "react-icons/io";
import { CiMail } from "react-icons/ci";

const ChatWithUs = () => {
  const [messages, setMessages] = useState([
     { id: 1, sender: 'user', img: userImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:30 AM' },
     { id: 2, sender: 'bot', img: botImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:31 AM' },
     { id: 3, sender: 'user', img: userImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:32 AM' },
     { id: 4, sender: 'bot', img: botImg, text: 'Lorem ipsum dolor sit amet consectetur. Turpis vivamus pretium ac diam vitae cursus.', time: '06:33 AM' },
   ]);
  return (
    <div className='flex flex-col  md:mx-[100px] mt-5 '>
      <h1 className='text-[20px] font-semibold md:mb-8 '>Payment Related Issue</h1>
      {messages.map(({ id, sender, img, text, time }) => (
        <div 
          key={id} 
          className={`flex items-start ${ 
            sender === 'user' ? ' self-start' : ' self-end'
          }`}
        >
          
          <img src={img} className="w-8 h-8 rounded-full mr-3" alt="User" />
          <div className='flex space-x-1 max-w-[400px] bg-gray-100 p-3 rounded-lg'>
          <div className="space-y-1">
            <p className="text-sm text-gray-800">{text}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
            </div>
        </div>
      ))}
        <div className='flex space-x-2 items-center'>
          <img src={userImg} className='w-8 h-8 rounded-full' />
        <p className="text-gray-500 space-x-3 text-sm flex items-center mt-2">Typing...</p>
        </div>
     
        <div className="relative space-x-3 max-w-full mt-6 flex items-center border rounded-lg px-3 py-2 bg-gray-100">
        <span className='absolute z-10 left-3'><CiMail /></span>
        <input
          type="text"
          placeholder="Message"
          className="w-full bg-transparent focus:outline-none px-5"
        />
        <button className="text-gray-500">
          <span className='text-xl'><IoIosAttach /></span>
        </button>
      </div>
    </div>
  )
}

export default ChatWithUs
