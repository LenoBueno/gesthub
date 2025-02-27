
import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-eink-white text-eink-black animate-fadeIn">
      <div className="flex-grow flex flex-col justify-center">
        <div className="max-w-[80%] w-full mx-auto px-3 py-6">
          <h1 className="text-lg md:text-2xl font-light text-center mb-8 uppercase">GestHub</h1>
          
          <div className="space-y-3">
            <Link 
              to="/client-pickup"
              className="block w-full p-2.5 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-sm md:text-base font-medium uppercase">Cliente Retira</span>
            </Link>

            <Link 
              to="/schedule-collection"
              className="block w-full p-2.5 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-sm md:text-base font-medium uppercase">Agendar Coleta</span>
            </Link>

            <Link 
              to="/request-quote"
              className="block w-full p-2.5 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-sm md:text-base font-medium uppercase">Cotação</span>
            </Link>

            <Link 
              to="/notas-control"
              className="block w-full p-2.5 md:p-6 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
            >
              <span className="text-sm md:text-base font-medium uppercase">Controle Notas</span>
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="w-full py-3 text-xs text-eink-gray text-center uppercase">
        © 2025 - DESENVOLVIDO POR 2103 CREATIVE - DESDE 2024
      </footer>
    </div>
  );
};

export default MainMenu;
