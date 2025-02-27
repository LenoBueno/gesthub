
import React from 'react';
import { Link } from 'react-router-dom';

interface MenuLink {
  to: string;
  label: string;
}

const menuLinks: MenuLink[] = [
  { to: "/client-pickup", label: "Cliente Retira" },
  { to: "/schedule-collection", label: "Agendar Coleta" },
  { to: "/request-quote", label: "Cotação" },
  { to: "/notas-control", label: "Controle Notas" }
];

const MainMenu = () => {
  const renderMenuLink = ({ to, label }: MenuLink) => (
    <Link 
      key={to}
      to={to}
      className="block w-full p-2 md:p-4 bg-eink-lightGray hover:bg-eink-gray transition-colors duration-200 rounded-lg shadow-sm"
    >
      <span className="text-xs md:text-base font-medium uppercase">{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-eink-white text-eink-black animate-fadeIn">
      <div className="flex-grow flex flex-col justify-center">
        <div className="max-w-[80%] w-full mx-auto px-3 py-6">
          <h1 className="text-lg md:text-2xl font-light text-center mb-6 uppercase">
            GestHub
          </h1>
          
          <nav className="space-y-2.5">
            {menuLinks.map(renderMenuLink)}
          </nav>
        </div>
      </div>
      
      <footer className="w-full py-3 text-xs text-eink-gray text-center uppercase">
        © 2025 - DESENVOLVIDO POR 2103 CREATIVE - DESDE 2024
      </footer>
    </div>
  );
};

export default MainMenu;
