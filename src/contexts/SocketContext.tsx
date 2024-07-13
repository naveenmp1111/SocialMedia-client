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

  useEffect(() => {
    // console.log('useEffect working')
    if (userInRedux) {
      const newSocket = io('http://localhost:3000', {
        query: {
          userId: userInRedux._id
        }
      }); // Replace with your server URL
      setSocket(newSocket);

      //socket .on is used to listen to the events.
      newSocket?.on('getOnlineUsers', (users) => {
        console.log('users online sare ', users)
        setOnlineUsers(users)
      })

      return () => {
        // console.log('coming in return why cdlsjflksdjflksdjflksdjflksdjfklsdjflksdj')
        newSocket.off('getOnlineUsers')
        newSocket.disconnect();
      };
    } else {
      setSocket(null)
    }
  }, [userInRedux]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
