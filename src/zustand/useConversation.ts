import { create } from 'zustand';
import { MessageInterface } from '../types/message';
import { ChatInterface } from '../types/chat';
import { setUnreadMessagesRead } from '../api/message';
import { reload } from 'firebase/auth';

interface SelectedFriend {
  _id:string;
  name: string;
  profilePic: string;
  username:string
}

interface ConversationState {
  selectedConversation: ChatInterface | null;
  setSelectedConversation: (selectedConversation: ChatInterface | null) => void;
  messages: MessageInterface[];
  setMessages: (messages: MessageInterface[]) => void;
  selectedFriend: SelectedFriend | null;
  setSelectedFriend: (friendData: SelectedFriend | null) => void;
  typingUsers:string[];
  setTypingUsers:(userId:string)=>void; 
  removeTypingUser:(userId:string)=>void;
  unreadMessages:MessageInterface[];
  setUnreadMessages:(messages: MessageInterface[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: async(selectedConversation) =>{
    set({ selectedConversation })
    if(selectedConversation){
      await setUnreadMessagesRead({chatId:selectedConversation._id})
    }
  } ,
  messages: [],
  setMessages: (messages) => set({ messages }),
  selectedFriend: null,
  setSelectedFriend: (friendData) => set({ selectedFriend: friendData }),
  typingUsers:[],
  setTypingUsers: (userId) => set((state) => {
     // Ensure userId is not already in the typingUsers array
     if (!state.typingUsers.includes(userId)) {
      return { typingUsers: [...state.typingUsers, userId] };
    }
    return state;
  }),
  removeTypingUser: (userId) => set((state) => ({
    typingUsers: state.typingUsers.filter((id) => id !== userId)
  })),
  unreadMessages:[],
  setUnreadMessages:(unreadMessages)=>set({unreadMessages}),
}));

export default useConversation;
