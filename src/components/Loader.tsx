// src/components/Loader.tsx

import React from 'react';

const Loader: React.FC = () => {
  return (
  //   <div className="flex justify-center items-center min-h-screen bg-gray-900">
  //   <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white"></div>
  // </div>
  <div className="flex justify-center items-center min-h-screen bg-gray-900 z-50">
   <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon"/>
</div>
  );
};

export default Loader;
