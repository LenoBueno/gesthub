
import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-eink-white text-eink-black animate-fadeIn">
      <div className="flex-grow flex flex-col justify-center">
        <div className="max-w-[85%] w-full mx-auto px-4 py-8">
          <h1 className="text-xl md:text-2xl font-light text-center mb-10 uppercase">GestHub</h1>
          
          <div className="space-y-4">
            <Link 
              to="/client-pickup"
              className="block w-full p-3 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-base font-medium uppercase">Cliente Retira</span>
            </Link>

            <Link 
              to="/schedule-collection"
              className="block w-full p-3 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-base font-medium uppercase">Agendar Coleta</span>
            </Link>

            <Link 
              to="/request-quote"
              className="block w-full p-3 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-base font-medium uppercase">Cotação</span>
            </Link>

            <Link 
              to="/notas-control"
              className="block w-full p-3 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-base font-medium uppercase">Controle Notas</span>
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-4 text-xs text-eink-gray text-center">
        © 2025 - desenvolvido por 2103 creative - Desde 2024
      </footer>
    </div>
  );
};

export default MainMenu;
