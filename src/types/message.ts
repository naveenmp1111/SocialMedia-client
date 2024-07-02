import { ChatInterface } from "./chat";
import { User } from "./loginUser";

export interface MessageInterface{
    _id: string;
    senderId: User;
    message: string;
    image?: string;
    chatId: ChatInterface;
    createdAt: string;
    updatedAt: string;
}

export interface GetAllMessagesFromChatResponse {
    status: string;
    messages: MessageInterface[];
}