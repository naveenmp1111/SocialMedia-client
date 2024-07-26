import { User } from "./loginUser";
import { MessageInterface } from "./message";




export interface ChatInterface {
    // latestMessage?: string;
    _id: string;
    // chatName: string;
    members: User[];
    latestMessage: MessageInterface;
    createdAt: string;
    updatedAt: string;
}

export interface FetchOtherUserChatResponse {
    status: string;
    message: string;
    chat: ChatInterface;
}

export interface FetchUserChatsResponse {
    status: string;
    message: string;
    chats: ChatInterface[];
}