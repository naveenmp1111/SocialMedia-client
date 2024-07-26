import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client';
import { StoreType } from '../redux/store';

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[] | undefined;
}

const SocketContext = createContext<SocketContextType>({ socket: null, onlineUsers: [] });


export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const userInRedux = useSelector((state: StoreType) => state.auth.user)
  const adminInRedux = useSelector((state: StoreType) => state.admin.admin)
  const loggedUser = userInRedux ? userInRedux : adminInRedux

  useEffect(() => {
    // console.log('useEffect working')
    if (loggedUser) {
      const newSocket = io('http://localhost:3000', {
        query: {
          userId: loggedUser._id
        }
      }); // Replace with your server URL
      setSocket(newSocket);

      //socket .on is used to listen to the events.
      newSocket?.on('getOnlineUsers', (users) => {
        console.log('users online sare ', users)
        setOnlineUsers(users)
      })

      return () => {
        newSocket.off('getOnlineUsers')
        newSocket.disconnect();
      };
    } else {
      setSocket(null)
    }
  }, [loggedUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
