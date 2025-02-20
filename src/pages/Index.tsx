
import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="min-h-screen bg-eink-white text-eink-black animate-fadeIn">
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-2xl font-light text-center mb-12 uppercase">GestHub</h1>
        
        <div className="space-y-6">
          <Link 
            to="/client-pickup"
            className="block w-full p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
          >
            <span className="text-lg font-medium uppercase">Cliente Retira</span>
          </Link>

          <Link 
            to="/schedule-collection"
            className="block w-full p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
          >
            <span className="text-lg font-medium uppercase">Agendar Coleta</span>
          </Link>

          <Link 
            to="/request-quote"
            className="block w-full p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
          >
            <span className="text-lg font-medium uppercase">Cotação</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
