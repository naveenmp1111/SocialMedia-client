// src/components/Loader.tsx

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
  </div>
  );
};

export default Loader;
