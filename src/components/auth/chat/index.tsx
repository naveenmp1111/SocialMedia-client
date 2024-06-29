import React, { useEffect, useState } from 'react';
import Conversation from './Conversation';
import Message from './Message';
import NewChatList from '../../../modals/chat/NewChatList';
import { FaRegEdit } from 'react-icons/fa';
import { fetchChats } from '../../../api/chat';
import { ChatInterface } from '../../../types/chat';
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
// import { faPhone, faVideo } from 'fortawesome/free-solid-svg-icons';

interface Friend {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
}

interface Message {
    id: number;
    text: string;
    time: string;
}

const friends: Friend[] = [
    { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
    { id: 2, name: 'Bob', lastMessage: 'Let\'s catch up later!', time: '11:15 AM' },
    { id: 3, name: 'Charlie', lastMessage: 'Meeting at 3 PM', time: '12:00 PM' },
];

const messages: Record<number, Message[]> = {
    1: [
        { id: 1, text: 'Hey, how are you?', time: '10:30 AM' },
        { id: 2, text: 'I\'m good, how about you?', time: '10:35 AM' },
    ],
    2: [
        { id: 1, text: 'Let\'s catch up later!', time: '11:15 AM' },
        { id: 2, text: 'Sure, let me know when you\'re free.', time: '11:20 AM' },
    ],
    3: [
        { id: 1, text: 'Meeting at 3 PM', time: '12:00 PM' },
        { id: 2, text: 'Got it, I\'ll be there.', time: '12:05 PM' },
    ],
};

const Chat: React.FC = () => {
    // const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
    const [isOpenNewChatModal,setIsOpenNewChatModal]=useState(false)
    const [chats,setChats]=useState<ChatInterface[]>([])
    const [selectedChatId,setSelectedChatId]=useState<string>('')

    // const handleFriendClick = (friendId: number) => {
    //     setSelectedFriend(friendId);
    // };

    useEffect(()=>{
        handleFetchChats()
    },[])

    const handleFetchChats=async()=>{
        const response=await fetchChats()
        console.log('handlefetchfunctionresponse is ',response)
        setChats(response.chats)
        console.log('state chat is ',chats)
    }

    console.log('selected chat id is ',selectedChatId)

    const HandleChatSelection=async(chatId:string)=>{
    //     await 
    }

    return (
        <>
        <NewChatList isOpen={isOpenNewChatModal} onClose={()=>setIsOpenNewChatModal(false)}/>
        <div className='flex h-screen px-28'>
            <div className='bg-gray-300 w-2/6 p-4 flex flex-col'>
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Chat Web</h1>
            <FaRegEdit size={24} className="cursor-pointer" onClick={()=>setIsOpenNewChatModal(true)} />
        </header>
                <div className="overflow-y-auto flex-1 p-3">
                    {chats?.map(chat => (
                        <div onClick={()=>HandleChatSelection(chat._id)}>
                        <Conversation chat={chat} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-yellow-200 w-full h-screen p-4 flex flex-col'>
                {selectedChatId && (
                    <>
                    <header className="bg-white p-4 text-gray-700">
                        <h1 className="text-2xl font-semibold">Alice</h1>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4">
                  
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
    
                    </div>
                    <footer className="bg-white border-t border-gray-300 p-4  bottom-0 w-full">
                        <div className="flex items-center">
                            <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                        </div>
                    </footer>
                    </>
                )}
            </div>
        </div>
        </>
    );

};

export default Chat;
