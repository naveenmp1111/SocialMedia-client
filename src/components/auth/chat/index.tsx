// import React, { useEffect, useState, useRef } from 'react';
// import Conversation from './Conversation';
// import Message from './Message';
// import NewChatList from '../../../modals/chat/NewChatList';
// import { FaRegEdit } from 'react-icons/fa';
// import { fetchChats } from '../../../api/chat';
// import { ChatInterface } from '../../../types/chat';
// import { getFullMessagesFromChat, sendMessage } from '../../../api/message';
// import { MessageInterface } from '../../../types/message';
// import { useSelector } from 'react-redux';
// import { StoreType } from '../../../redux/store';
// import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
// import { useSocket } from '../../../contexts/SocketContext';


// const Chat: React.FC = () => {
//     const [selectedFriend, setSelectedFriend] = useState<{ name: string, profilePic: string }>();
//     const [isOpenNewChatModal, setIsOpenNewChatModal] = useState(false)
//     const [chats, setChats] = useState<ChatInterface[]>([])
//     const [selectedChatId, setSelectedChatId] = useState<string>('')
//     const [messages, setMessages] = useState<MessageInterface[]>([])
//     const userInRedux = useSelector((state: StoreType) => state.auth.user)
//     const [newMessage, setNewMessage] = useState<string>('');
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const { socket } = useSocket();

//     useEffect(() => {
//         handleFetchChats()
//     }, [newMessage])

//     const handleFetchChats = async () => {
//         const response = await fetchChats()
//         // console.log('handlefetchfunctionresponse is ', response)
//         setChats(response.chats)
//         // console.log('state chat is ', chats)
//     }

//     // console.log('selected chat id is ', selectedChatId)

//     const HandleChatSelection = async (chatId: string, selectedUser: { name: string, profilePic: string }) => {
//         setSelectedChatId(chatId)
//         const response = await getFullMessagesFromChat({ chatId })
//         setMessages(response?.messages)
//         setSelectedFriend(selectedUser)
//     }


//     const handleSendMessage = async () => {
//         if (newMessage.trim() !== '' && selectedChatId) {
//             const response = await sendMessage({ chatId: selectedChatId, message: newMessage });
//             setMessages([...messages, response.message]); // Assuming response contains the new message
//             setNewMessage(''); // Clear the input field
//             // socket?.emit('message',response.message)
//         }
//     };

//     const handleEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
//         setNewMessage(newMessage + emojiObject.emoji);
//       };

//       useEffect(()=>{
//         scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
//       },[newMessage])

//     return (
//         <>
//             <NewChatList isOpen={isOpenNewChatModal} onClose={() => setIsOpenNewChatModal(false)} handleChatSelection={HandleChatSelection} />
//             <div className='flex h-screen px-28 '>
//                 <div className='bg-gray-300 w-2/6 p-3 flex flex-col max-h-[740px] mt-4 rounded-lg'>
//                     <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-800 text-white">
//                         <h1 className="text-2xl font-semibold">Messages</h1>
//                         <FaRegEdit size={24} className="cursor-pointer" onClick={() => setIsOpenNewChatModal(true)} />
//                     </header>
//                     <div className="overflow-y-auto flex-1 p-3">
//                         {chats?.map(chat => {
//                             const { _id: chatId, members } = chat;
//                             const selectedUser = members.find(member => member?._id !== userInRedux?._id)
//                             const selectedUserObj = {
//                                 name: selectedUser?.name as string,
//                                 profilePic: selectedUser?.profilePic as string
//                             }

//                             return chat.latestMessage && (
//                                 <div key={chatId} onClick={() => HandleChatSelection(chatId, selectedUserObj)}>
//                                     <Conversation chat={chat} />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//                 <div className='bg-yellow-200 w-full h-screen mt-4 ml-3 rounded-lg p-4 flex flex-col max-h-[740px]'>
//                     {selectedChatId && (
//                         <>
//                             <header className="bg-white p-4 text-gray-700 flex">
//                                 <img className='w-10 h-10 rounded-full' src={selectedFriend?.profilePic} alt="" />
//                                 <span className="text-2xl font-semibold mx-3 align-middle">{selectedFriend?.name}</span>
//                             </header>
//                             <div className="flex-1 overflow-y-auto p-4">

//                                 {messages.map(message => (
//                                     <div ref={scrollRef}>
//                                     <Message message={message} own={message.senderId._id == userInRedux?._id} />
//                                     </div>
//                                 ))}

//                             </div>
//                             <footer className="bg-white border-t border-gray-300 p-4  bottom-0 w-full">
//                                 <div className="flex items-center relative">
//                                     <button
//                                         className="focus:outline-none mx-1"
//                                         onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                                     >
//                                         <span className="text-3xl">😊</span>
//                                     </button>
//                                     {showEmojiPicker && (
//                                         <div className="absolute bottom-16 left-0 z-10">
//                                             <EmojiPicker onEmojiClick={handleEmojiClick} />
//                                         </div>
//                                     )}
//                                     <input
//                                         type="text"
//                                         value={newMessage}
//                                         onChange={(e) => setNewMessage(e.target.value)}
//                                         placeholder="Type a message..."
//                                         className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
//                                     />
//                                     <button
//                                         onClick={handleSendMessage}
//                                         className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
//                                     >
//                                         Send
//                                     </button>
//                                 </div>
//                             </footer>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </>
//     );

// };

// export default Chat;




import React, { useEffect, useState, useRef } from 'react';
import Conversation from './Conversation';
import Message from './Message';
import NewChatList from '../../../modals/chat/NewChatList';
import { FaRegEdit } from 'react-icons/fa';
import { fetchChats } from '../../../api/chat';
import { ChatInterface } from '../../../types/chat';
import { getFullMessagesFromChat, sendMessage } from '../../../api/message';
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


const Chat: React.FC = () => {
    // const [selectedFriend, setSelectedFriend] = useState<{ name: string, profilePic: string }>();
    const [isOpenNewChatModal, setIsOpenNewChatModal] = useState(false)
    // const [chats, setChats] = useState<ChatInterface[]>([])
    const [selectedChatId, setSelectedChatId] = useState<string>('')
    // const [messages, setMessages] = useState<MessageInterface[]>([])
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const [newMessage, setNewMessage] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    // const { socket } = useSocket();

    const {chats}=useGetConversations()
    const {sendmessage}=useSendMessage()
    const {messages}=useGetMessages()
    const {selectedConversation,setSelectedConversation,selectedFriend,setSelectedFriend}=useConversation()

   
    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

      useEffect(()=>{
        setTimeout(()=>{
            scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
        },500)
        
      },[messages])


      
      const handleSubmit=async()=>{
        if(!newMessage.trim())return setNewMessage('')
        try {
            await sendmessage(newMessage)
        } catch (error) {
            console.log('error in message submittion ',error)
        }finally{
            setNewMessage('')
            setShowEmojiPicker(false)
        }
      }

      useListenMessages()
      console.log('MESSAGES ARE ',messages)

    return (
        <>
            <NewChatList isOpen={isOpenNewChatModal} onClose={() => setIsOpenNewChatModal(false)}  />
            <div className='flex h-screen px-28 '>
                <div className='bg-gray-300 w-2/6 p-3 flex flex-col max-h-[740px] mt-4 rounded-lg'>
                    <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-800 text-white">
                        <h1 className="text-2xl font-semibold">Messages</h1>
                        <FaRegEdit size={24} className="cursor-pointer" onClick={() => setIsOpenNewChatModal(true)} />
                    </header>
                    <div className="overflow-y-auto flex-1 p-3">
                        {chats?.map(chat => {
                            const { _id: chatId, members } = chat;
                            const selectedUser = members.find(member => member?._id !== userInRedux?._id)
                            const selectedUserObj = {
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
                <div className='bg-yellow-200 w-full h-screen mt-4 ml-3 rounded-lg p-4 flex flex-col max-h-[740px]'>
                    {selectedConversation && (
                        <>
                            <header className="bg-white p-4 text-gray-700 flex">
                                <img className='w-10 h-10 rounded-full' src={selectedFriend?.profilePic} alt="" />
                                <span className="text-2xl font-semibold mx-3 align-middle">{selectedFriend?.name}</span>
                            </header>
                            <div className="flex-1 overflow-y-auto p-4">

                                {messages.map(message => (
                                    <div ref={scrollRef}>
                                    <Message message={message} own={message.senderId._id == userInRedux?._id} />
                                    </div>
                                ))}

                            </div>
                            <footer className="bg-white border-t border-gray-300 p-4  bottom-0 w-full">
                                <div className="flex items-center relative">
                                    <button
                                        className="focus:outline-none mx-1"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    >
                                        <span className="text-3xl">😊</span>
                                    </button>
                                    {showEmojiPicker && (
                                        <div className="absolute bottom-16 left-0 z-10">
                                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                                    >
                                        Send
                                    </button>
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


