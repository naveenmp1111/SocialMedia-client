
import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import Conversation from './Conversation';
import Message from './Message';
import NewChatList from '../../../modals/chat/NewChatList';
import { FaRegEdit } from 'react-icons/fa';
import { fetchChats } from '../../../api/chat';
import { ChatInterface } from '../../../types/chat';
import { getFullMessagesFromChat, sendMessage, setUnreadMessagesRead } from '../../../api/message';
import { MessageInterface } from '../../../types/message';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../redux/store';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useSocket } from '../../../contexts/SocketContext';
import useGetConversations from '../../../hooks/useGetConversation';
import useConversation from '../../../zustand/useConversation';
import useSendMessage from '../../../hooks/useSendMessages';
import useGetMessages from '../../../hooks/useGetMessages';
import useListenMessages from '../../../hooks/useListenMessages';
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import { IoLogoWechat } from "react-icons/io5";
import Typing from '../../../animations/Typing';
import FullMessageComponent from './FullMessageComponent';


const Chat: React.FC = () => {
    // const [selectedFriend, setSelectedFriend] = useState<{ name: string, profilePic: string }>();
    const [isOpenNewChatModal, setIsOpenNewChatModal] = useState(false)
    const navigate = useNavigate()
    // const [chats, setChats] = useState<ChatInterface[]>([])
    const [selectedChatId, setSelectedChatId] = useState<string>('')
    // const [messages, setMessages] = useState<MessageInterface[]>([])
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    // const [newMessage, setNewMessage] = useState<string>('');
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // const scrollRef = useRef<HTMLDivElement>(null);
    // const [typing,setTyping]=useState<boolean>(false)
    // const [isTyping,setIsTyping]=useState<boolean>(false)


    const { chats } = useGetConversations()
    // const { sendmessage } = useSendMessage()
    // const {socket}=useSocket()
    // const { messages } = useGetMessages()
    const { selectedConversation, setSelectedConversation, selectedFriend, setSelectedFriend,typingUsers } = useConversation()


    // const handleEmojiClick = (emojiObject: EmojiClickData) => {
    //     setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    // };

    // useEffect(() => {
    //     setTimeout(() => {
    //         scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    //     }, 500)

    // }, [messages])

    // const handleSubmit = async () => {
    //     if (!newMessage.trim()) return setNewMessage('')
    //     try {
    //         await sendmessage(newMessage)
    //     } catch (error) {
    //         console.log('error in message submittion ', error)
    //     } finally {
    //         setNewMessage('')
    //         setShowEmojiPicker(false)
    //     }
    // }

    // const TypingHandler=(e: ChangeEvent<HTMLInputElement>)=>{
    //     setNewMessage(e.target.value)
    //     if(!typing){
    //     setTyping(true)
    //     socket?.emit('Typing',selectedFriend?._id,userInRedux?._id)
    //     }

    //     let lastTypingTime=new Date().getTime()
    //     var timelength=3000
    //     setTimeout(()=>{
    //         var timenow=new Date().getTime()
    //         var timeDiff=timenow-lastTypingTime
    //         if(timeDiff>=timelength && typing){
    //             socket?.emit('Stop Typing',selectedFriend?._id,userInRedux?._id)
    //             setTyping(false)
    //         }
    //     },timelength)
    // }

    useListenMessages()
   
    //search 
    const [searchInput,setSearchInput]=useState<string>('')
    const filteredChats = chats?.filter(chat => {
        const selectedUser = chat.members.find(member => member?._id !== userInRedux?._id);
        return selectedUser?.name.toLowerCase().includes(searchInput.toLowerCase());
      });

    return (
        <>
            <NewChatList isOpen={isOpenNewChatModal} onClose={() => setIsOpenNewChatModal(false)} />
            <div className='flex h-screen px-28 py-3'>
                <div className='bg-gray-200 w-2/6 p-3 flex flex-col max-h-[740px]  rounded-lg'>
                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-gray-700 text-white rounded-lg">
                        <FaArrowLeft onClick={() => navigate('/home')} />
                        <h1 className="text-2xl font-semibold">Messages</h1>
                        <FaRegEdit size={24} className="cursor-pointer" onClick={() => setIsOpenNewChatModal(true)} />
                    </header>
                    <input type="text" placeholder='Search...' onChange={(e)=>setSearchInput(e.target.value)} className=' mt-2 rounded-lg p-1 px-2 outline-none '/>
                    <div className="overflow-y-auto flex-1 p-3">
                        {filteredChats?.map(chat => {
                            const { _id: chatId, members } = chat;
                            const selectedUser = members.find(member => member?._id !== userInRedux?._id)
                            const selectedUserObj = {
                                _id:selectedUser?._id as string,
                                name: selectedUser?.name as string,
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
                <div className='bg-gray-100 w-full  ml-3 rounded-lg p-4 flex flex-col max-h-[740px]'>
                    {selectedConversation ? (
                        <FullMessageComponent/>
                        // <>
                        //     <header className="bg-white p-4 text-gray-700 flex rounded-lg shadow-gray-300 shadow-lg z-20 ">
                        //         <img className='w-10 h-10 rounded-full' src={selectedFriend?.profilePic} alt="" />
                        //         <span className="text-2xl font-semibold mx-3 align-middle">{selectedFriend?.name}</span>
                        //     </header>
                        //     <div className="flex-1 overflow-y-auto p-4">

                        //         {messages.map(message => (
                        //             <div ref={scrollRef}>
                        //                 <Message message={message} own={message.senderId._id == userInRedux?._id} />
                        //             </div>
                        //         ))}
                        //         {typingUsers.includes(selectedFriend?._id as string) ? 
                        //         <div ref={scrollRef}>
                        //             <Typing/>
                        //         </div>
                        //         :
                        //         ''}

                        //     </div>
                        //     <footer className="bg-white border-t border-gray-300 p-4 rounded-lg bottom-0 w-full">
                        //         <div className="flex items-center relative">
                        //             <button
                        //                 className="focus:outline-none mx-1"
                        //                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        //             >
                        //                 <span className="text-3xl">😊</span>
                        //             </button>
                        //             {showEmojiPicker && (
                        //                 <div className="absolute bottom-16 left-0 z-10">
                        //                     <EmojiPicker onEmojiClick={handleEmojiClick} />
                        //                 </div>
                        //             )}
                        //             <input
                        //                 type="text"
                        //                 value={newMessage}
                        //                 onChange={TypingHandler}
                        //                 placeholder="Type a message..."
                        //                 className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                        //             />
                        //             <button
                        //                 onClick={handleSubmit}
                        //                 className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                        //             >
                        //                 Send
                        //             </button>
                        //         </div>
                        //     </footer>
                        // </>
                    ) : (
                        <>
                            <div className='w-full h-full flex justify-center items-center'>
                                <div className='flex flex-col justify-center items-center'>
                                    <IoLogoWechat className='h-32 w-32 text-gray-500' />
                                    <h2 className='font-semibold text-2xl'>Select to start converstion.</h2>
                                    <button onClick={()=>setIsOpenNewChatModal(true)} className='bg-gray-700 hover:bg-gray-900 p-2 m-2 rounded-lg text-white font-semibold'>Start New Chat.</button>
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


