import React, { MutableRefObject, createContext, useContext, useRef } from 'react';

// Define the context properties
interface CommentInputContextProps {
  commentInputRef: MutableRefObject<HTMLInputElement | null>;
}

// Create the context
const CommentInputContext = createContext<CommentInputContextProps | undefined>(undefined);

// Create a hook for consuming the context
export const useCommentInputContext = () => {
  const context = useContext(CommentInputContext);
  if (!context) {
    throw new Error('useCommentInputContext must be used within a CommentInputProvider');
  }
  return context;
};

// Create the provider component
const CommentInputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <CommentInputContext.Provider value={{ commentInputRef }}>
      {children}
    </CommentInputContext.Provider>
  );
};

export default CommentInputProvider;
