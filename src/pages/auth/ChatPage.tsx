import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

// Lazy load the Chat component
const Chat = React.lazy(() => import('../../components/auth/chat'));

const ChatPage = () => {
  const isAuthenticated = useSelector((state: StoreType) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Chat />
      </Suspense>
    );
  }

  return <Navigate to='/login' />;
};

export default ChatPage;
