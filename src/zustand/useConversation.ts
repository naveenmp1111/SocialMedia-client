import { create } from 'zustand';
import { MessageInterface } from '../types/message';
import { ChatInterface } from '../types/chat';
import { setUnreadMessagesRead } from '../api/message';

interface SelectedFriend {
  _id:string;
  name: string;
  profilePic: string;
}

interface ConversationState {
  selectedConversation: ChatInterface | null;
  setSelectedConversation: (selectedConversation: ChatInterface) => void;
  messages: MessageInterface[];
  setMessages: (messages: MessageInterface[]) => void;
  selectedFriend: SelectedFriend | null;
  setSelectedFriend: (friendData: SelectedFriend) => void;
  typingUsers:string[];
  setTypingUsers:(userId:string)=>void; 
  removeTypingUser:(userId:string)=>void;
  UnreadMessages:MessageInterface[];
  setUnreadMessages:(messages: MessageInterface[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: async(selectedConversation) =>{
    set({ selectedConversation })
    await setUnreadMessagesRead({chatId:selectedConversation._id})
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
  UnreadMessages:[],
  setUnreadMessages:(UnreadMessages)=>set({UnreadMessages})
}));

export default useConversation;
