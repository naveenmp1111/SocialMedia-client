import { User } from "./loginUser";




export interface ChatInterface {
    _id: string;
    // chatName: string;
    members: User[];
    // latestMessage: MessageInterface;
    createdAt: string;
    updatedAt: string;
}

// export interface FetchOtherUserChatResponse {
//     status: string;
//     chat: ChatInterface;
// }

export interface FetchUserChatsResponse {
    status: string;
    message:string;
    chats: ChatInterface[];
}