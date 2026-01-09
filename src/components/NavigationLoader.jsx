import React from 'react';

const NavigationLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-800 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default NavigationLoader;