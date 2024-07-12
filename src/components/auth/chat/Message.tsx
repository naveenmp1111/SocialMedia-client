import React, { useState } from 'react';
import { MessageInterface } from '../../../types/message';
import useConversation from '../../../zustand/useConversation';
import useGetMessages from '../../../hooks/useGetMessages';
import { deleteMessage, deleteMessageForMe } from '../../../api/message';
import { format, isToday } from 'date-fns';

const Message = ({ own, message }: { own?: boolean, message: MessageInterface}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    let {messages,setMessages}=useConversation()

    const handleDeleteMessage=()=>{
        deleteMessage({messageId:message._id})
        messages=messages.filter(item=>item._id!=message._id)
        setMessages(messages)
    }

    const handleDeleteMessageForMe=()=>{
        deleteMessageForMe({messageId:message._id})
        messages=messages.filter(item=>item._id!=message._id)
        setMessages(messages)
    }
    
    const messageDate = new Date(message.createdAt);
    const displayDate = isToday(messageDate) ? format(messageDate, 'p') : format(messageDate, 'P p');

    return (
        <>
        <div className='w-full flex justify-center'>
            <span className='text-gray-500 text-xs'>{ displayDate}</span>
        </div>
            <div className={`group flex mb-4 cursor-pointer ${own ? 'justify-end' : ''}`}>
                {own  ? (
                    <>
                        <div className='relative'>
                            <div className='cursor-pointer hidden group-hover:block' onClick={toggleDropdown}>
                                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path d="M24 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
                                </svg>
                            </div>

                            {showDropdown && (
                                <div id="dropdownDotsHorizontal" className="absolute right-5 top-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                        <li onClick={handleDeleteMessageForMe}>
                                            <a className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Delete for me</a>
                                        </li>
                                        <li onClick={handleDeleteMessage}>
                                            <a className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Delete for everyone</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p className='max-w-80 break-words'>{message.message}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img src={message.senderId.profilePic} alt="My Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                    </>
                ) : (
                    <>
                    
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img src={message.senderId.profilePic} alt="User Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3 break-words">
                            <p className="text-gray-700 max-w-80 break-words">{message.message}</p>
                        </div>
                        <div className='relative'>
                            <div className='cursor-pointer hidden group-hover:block' onClick={toggleDropdown}>
                                <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                    <path d="M24 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
                                </svg>
                            </div>

                            {showDropdown && (
                                <div id="dropdownDotsHorizontal" className="absolute top-0 left-5 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800 dark:divide-gray-600">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                        <li onClick={handleDeleteMessageForMe}>
                                            <a className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full">Delete for me</a>
                                        </li>
                                       
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Message;
