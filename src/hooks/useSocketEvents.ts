// // useSocketEvents.ts
// import { useEffect } from 'react';
// import { useSocket } from '../contexts/SocketContext';
// import useChatStore from '../zustand/MessageStore';
// import { MessageInterface } from '../types/message';

// const useSocketEvents = () => {
//   const { socket } = useSocket();
//   const {
//     setRealTimeMessages
// } = useChatStore();

//   useEffect(() => {
//     if (socket) {
//       const handleConnect = () => {
//         console.log('Connected to the server');
//       };

//       const handleDisconnect = () => {
//         console.log('Disconnected from the server');
//       };

//       const handleMessage = (message:MessageInterface) => {
//         console.log('New message to set up as real time:', message);
//         setRealTimeMessages(message)
//       };

//       socket.on('connect', handleConnect);
//       socket.on('disconnect', handleDisconnect);
//       socket.on('message', handleMessage);

//       return () => {
//         socket.off('connect', handleConnect);
//         socket.off('disconnect', handleDisconnect);
//         socket.off('message', handleMessage);
//       };
//     }
//   }, [socket]);
// };

// export default useSocketEvents;
