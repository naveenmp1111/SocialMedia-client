// import create from 'zustand';
// import { getFullMessagesFromChat, sendMessage } from '../api/message';
// import { ChatInterface } from '../types/chat';
// import { MessageInterface } from '../types/message';
// import { fetchChats } from '../api/chat';
// import { useSocket } from '../contexts/SocketContext';

// interface ChatState {
//     selectedFriend: { name: string; profilePic: string } | null;
//     isOpenNewChatModal: boolean;
//     chats: ChatInterface[];
//     selectedChatId: string;
//     messages: MessageInterface[];
//     newMessage: string;
//     showEmojiPicker: boolean;
//     handleFetchChats: () => Promise<void>;
//     handleChatSelection: (chatId: string, selectedUser: { name: string; profilePic: string }) => Promise<void>;
//     handleSendMessage: () => Promise<void>;
//     setNewMessage: (message: string) => void;
//     setShowEmojiPicker: (show: boolean) => void;
//     setIsOpenNewChatModal: (isOpen: boolean) => void;
//     setRealTimeMessages:(message:MessageInterface)=>void
// }

// const useChatStore = create<ChatState>((set, get) => ({
//     selectedFriend: null,
//     isOpenNewChatModal: false,
//     chats: [],
//     selectedChatId: '',
//     messages: [],
//     newMessage: '',
//     showEmojiPicker: false,
//     handleFetchChats: async () => {
//         const response = await fetchChats();
//         set({ chats: response.chats });
//     },
//     handleChatSelection: async (chatId, selectedUser) => {
//         const response = await getFullMessagesFromChat({ chatId });
//         set({
//             selectedChatId: chatId,
//             messages: response?.messages,
//             selectedFriend: selectedUser,
//         });
//     },
//     handleSendMessage: async () => {
//         const { selectedChatId, newMessage, messages } = get();
//         if (newMessage.trim() !== '' && selectedChatId) {
//             const response = await sendMessage({ chatId: selectedChatId, message: newMessage });
//             set({ messages: [...messages, response.message], newMessage: '' });
//             return response.message
//             // socket?.emit('message',response.message)
//             // Emit the socket message here if needed
//         }
//     },
//     setNewMessage: (message) => set({ newMessage: message }),
//     setShowEmojiPicker: (show) => set({ showEmojiPicker: show }),
//     setIsOpenNewChatModal: (isOpen) => set({ isOpenNewChatModal: isOpen }),

//     setRealTimeMessages:(message)=>{
//         const {messages}=get()
//         set({messages:[...messages,message]})
//     }
// }));

// export default useChatStore;
