import { ChatInterface } from "./chat";
import { User } from "./loginUser";

export interface MessageInterface {
    _id: string;
    senderId: User;
    message: string;
    image?: string;
    chatId: ChatInterface;
    isSeen: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetAllMessagesFromChatResponse {
    status: string;
    messages: MessageInterface[];
}

export interface SingleMessageFromChat {
    status: string;
    message: MessageInterface
}