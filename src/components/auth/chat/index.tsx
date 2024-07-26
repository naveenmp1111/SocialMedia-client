
import React, { useState } from 'react';
import Conversation from './Conversation';
import NewChatList from '../../../modals/chat/NewChatList';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import useGetConversations from '../../../hooks/useGetConversation';
import useConversation from '../../../zustand/useConversation';
import useListenMessages from '../../../hooks/useListenMessages';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoLogoWechat } from "react-icons/io5";
import FullMessageComponent from './FullMessageComponent';


const Chat: React.FC = () => {

    const [isOpenNewChatModal, setIsOpenNewChatModal] = useState(false)
    const navigate = useNavigate()
    const userInRedux = useSelector((state: StoreType) => state.auth.user)

    const { chats } = useGetConversations()

    const { selectedConversation, setSelectedFriend, selectedFriend } = useConversation()

    useListenMessages()

    //search 
    const [searchInput, setSearchInput] = useState<string>('')
    const filteredChats = chats?.filter(chat => {
        const selectedUser = chat.members.find(member => member?._id !== userInRedux?._id);
        return selectedUser?.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
        <>
            <NewChatList isOpen={isOpenNewChatModal} onClose={() => setIsOpenNewChatModal(false)} />
            <div className='flex h-screen md:px-28 py-3'>
                <div className={`bg-gray-200 md:w-2/6 w-full p-3 flex flex-col h-full md:max-h-[740px] md:block ${selectedFriend ? 'hidden' : 'block'} rounded-lg`}>
                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-gray-700 text-white rounded-lg">
                        <FaArrowLeft className='cursor-pointer' onClick={() => navigate('/home')} />
                        <h1 className="text-2xl font-semibold">Messages</h1>
                        <FaRegEdit size={24} className="cursor-pointer" onClick={() => setIsOpenNewChatModal(true)} />
                    </header>
                    <input type="text" placeholder='Search...' onChange={(e) => setSearchInput(e.target.value)} className=' mt-2 rounded-lg p-1 px-2 outline-none  w-full' />
                    <div className="overflow-y-auto flex-1 p-3">
                        {filteredChats?.map(chat => {
                            const { _id: chatId, members } = chat;
                            const selectedUser = members.find(member => member?._id !== userInRedux?._id)
                            const selectedUserObj = {
                                _id: selectedUser?._id as string,
                                name: selectedUser?.name as string,
                                username: selectedUser?.username as string,
                                profilePic: selectedUser?.profilePic as string
                            }

                            return chat.latestMessage && (
                                <div key={chatId} onClick={() => setSelectedFriend(selectedUserObj)}>
                                    <Conversation chat={chat} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={`bg-gray-100 w-full  md:ml-3 rounded-lg p-4 flex flex-col md:block ${selectedFriend ? 'block' : 'hidden'} h-full  md:max-h-[740px]`}>
                    {selectedConversation ? (
                        <FullMessageComponent />
                    ) : (
                        <>
                            <div className='w-full h-full flex justify-center items-center'>
                                <div className='flex flex-col justify-center items-center'>
                                    <IoLogoWechat className='h-32 w-32 text-gray-500' />
                                    <h2 className='font-semibold text-2xl'>Select to start converstion.</h2>
                                    <button onClick={() => setIsOpenNewChatModal(true)} className='bg-gray-700 hover:bg-gray-900 p-2 m-2 rounded-lg text-white font-semibold'>Start New Chat.</button>
                                </div>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </>
    );

};

export default Chat;


