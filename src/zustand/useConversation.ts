import { create } from 'zustand';
import { MessageInterface } from '../types/message';
import { ChatInterface } from '../types/chat';

interface SelectedFriend {
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
  // onlineUsers:string[];
  // setOnlineUsers:(users:string[])=>void
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  selectedFriend: null,
  setSelectedFriend: (friendData) => set({ selectedFriend: friendData }),
  // onlineUsers:[],
  // setOnlineUsers:(users)=>set({onlineUsers:users})
}));

export default useConversation;
