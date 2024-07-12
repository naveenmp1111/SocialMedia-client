import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import useSendMessage from '../../../hooks/useSendMessages';
import { useSocket } from '../../../contexts/SocketContext';
import useGetMessages from '../../../hooks/useGetMessages';
import useConversation from '../../../zustand/useConversation';
import { useSelector } from 'react-redux'
import { StoreType } from '../../../redux/store';
import Message from './Message';
import Typing from '../../../animations/Typing';
import { deleteMessage, deleteMessageForMe, setUnreadMessagesRead } from '../../../api/message';
import { User } from '../../../types/loginUser';
import { getUserByUsername, unblockUserByUsername } from '../../../api/user';
import { unblockUser } from '../../../api/admin';
import { reload } from 'firebase/auth';


const FullMessageComponent = () => {
    const [typing, setTyping] = useState<boolean>(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const userInRedux = useSelector((state: StoreType) => state.auth.user)
    const [fullFriendData, setFullFriendData] = useState<User>()
    const [OurFullData, setOurFullData] = useState<User>()

    const { sendmessage } = useSendMessage()
    const { socket,onlineUsers } = useSocket()
    let { messages } = useGetMessages()
    const { selectedConversation, setSelectedConversation, selectedFriend, setSelectedFriend, typingUsers, setMessages } = useConversation()

    const isOnline = selectedFriend && selectedFriend._id ? onlineUsers?.includes(selectedFriend?._id) : false;

    const TypingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
        if (!typing) {
            setTyping(true)
            socket?.emit('Typing', selectedFriend?._id, userInRedux?._id)
        }

        let lastTypingTime = new Date().getTime()
        var timelength = 3000
        setTimeout(() => {
            var timenow = new Date().getTime()
            var timeDiff = timenow - lastTypingTime
            if (timeDiff >= timelength && typing) {
                socket?.emit('Stop Typing', selectedFriend?._id, userInRedux?._id)
                setTyping(false)
            }
        }, timelength)
    }

    const handleEmojiClick = (emojiObject: EmojiClickData) => {
        setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleSubmit = async () => {
        if (!newMessage.trim()) return setNewMessage('')
        try {
            await sendmessage(newMessage)
        } catch (error) {
            console.log('error in message submittion ', error)
        } finally {
            setNewMessage('')
            setShowEmojiPicker(false)
        }
    }

    useEffect(() => {
        handleGetFriendData()
    }, [selectedFriend])

    const handleGetFriendData = async () => {
        console.log('selected friend is ', selectedFriend)
        const response = await getUserByUsername(selectedFriend?.username as string)
        setFullFriendData(response.user)
        const myData = await getUserByUsername(userInRedux?.username as string)
        setOurFullData(myData.user)
        console.log('full friend data is ', response)
    }


    useEffect(() => {
        setTimeout(() => {
            scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500)

    }, [messages])

    useEffect(() => {
        const markasRead = async () => {
            if (selectedConversation)
                await setUnreadMessagesRead({ chatId: selectedConversation._id })
        }
        markasRead()
    }, [messages])

    const handleUnblock=async()=>{
        try {
            await unblockUserByUsername(selectedFriend?.username as string)
            handleGetFriendData()
        } catch (error) {
         console.log(error)   
        }
    }

    return (
        <>
            <header className="bg-white p-4 text-gray-700 flex rounded-lg shadow-gray-300 shadow-lg z-20 ">
                <img className='w-10 h-10 rounded-full' src={selectedFriend?.profilePic} alt="" />
                <div className='flex flex-col'>
                <span className="text-2xl font-semibold mx-3 align-middle">{selectedFriend?.name}</span>
                {isOnline && (
                    <>
                    <span className='text-xs ml-3'>online</span>
                    
                    </>
                )}
                </div>
                
                
            </header>
            <div className="flex-1 overflow-y-auto p-4">

                {messages.map(message => (
                    <div key={message._id} ref={scrollRef}>
                        <Message message={message} own={message.senderId._id == userInRedux?._id} />

                    </div>
                ))}
                {typingUsers.includes(selectedFriend?._id as string) ?
                    <div ref={scrollRef}>
                        <Typing />
                    </div>
                    :
                    ''}

            </div>
            {OurFullData?.blocklist && selectedFriend?._id && !OurFullData.blocklist.includes(selectedFriend._id as string) &&
                fullFriendData?.blocklist && OurFullData?._id && !fullFriendData.blocklist.includes(OurFullData._id as string) && (
                    <footer className="bg-white border-t border-gray-300 p-4 rounded-lg bottom-0 w-full">
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
                                onChange={TypingHandler}
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
                )}

            {OurFullData?.blocklist && selectedFriend?._id && OurFullData.blocklist.includes(selectedFriend._id as string) &&
                <footer className="bg-gray-200 border-t border-gray-300 p-4 rounded-lg bottom-0 w-full flex justify-center">
                    <button onClick={handleUnblock} className='bg-red-600 font-semibold text-white p-2 rounded-lg'>Unblock {selectedFriend.name}</button>
                </footer>
            }

            {fullFriendData?.blocklist && OurFullData?._id && fullFriendData.blocklist.includes(OurFullData._id as string) && 
                <footer className="bg-white border-t border-gray-300 p-4 rounded-lg bottom-0 w-full ">
                <button>Something went wrong...</button>
            </footer>
            }

        </>
    )
}

export default FullMessageComponent