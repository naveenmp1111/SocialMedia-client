import React from 'react'
import { MessageInterface } from '../../../types/message';

const Message = ({ own,message }: { own?: boolean,message:MessageInterface }) => {
    return (
        <>
            <div className={`flex mb-4 cursor-pointer ${own ? 'justify-end' : ''}`}>
                {own ? (
                    <>
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>{message.message}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img src={message.senderId.profilePic} alt="My Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img src={message.senderId.profilePic}  alt="User Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">{message.message}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Message