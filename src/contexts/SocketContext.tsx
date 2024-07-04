import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {useSelector} from 'react-redux'
import { io, Socket } from 'socket.io-client';
import { StoreType } from '../redux/store';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });


export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userInRedux=useSelector((state:StoreType)=>state.auth.user)

  useEffect(() => {
    if(userInRedux){
    const newSocket = io('http://localhost:3000'); // Replace with your server URL
    setSocket(newSocket);
      
    return () => {
      newSocket.disconnect();
    };
  }
  }, [userInRedux]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
