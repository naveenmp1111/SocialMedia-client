import React from 'react';

const keyframes = `
  @keyframes loadingFade {
    0% { opacity: 0; }
    50% { opacity: 0.8; }
    100% { opacity: 0; }
  }
`;

const Typing = () => (
  <>
    <style>{keyframes}</style>
    <div className="w-20 h-8 relative p-2 ml-2  mb-5 bg-gray-300 rounded-full flex items-center justify-center">
      <div className="w-2 h-2 mx-1 bg-gray-600 rounded-full opacity-0" style={{ animation: 'loadingFade 1s infinite', animationDelay: '0s' }}></div>
      <div className="w-2 h-2 mx-1 bg-gray-600 rounded-full opacity-0" style={{ animation: 'loadingFade 1s infinite', animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 mx-1 bg-gray-600 rounded-full opacity-0" style={{ animation: 'loadingFade 1s infinite', animationDelay: '0.4s' }}></div>
    </div>
  </>
);

export default Typing;
