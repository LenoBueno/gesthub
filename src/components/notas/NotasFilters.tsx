
import React from 'react';
import { Search, Calendar } from 'lucide-react';

interface NotasFiltersProps {
  busca: string;
  setBusca: (value: string) => void;
  filtroStatus: string;
  setFiltroStatus: (value: string) => void;
  ordenacao: 'asc' | 'desc';
  setOrdenacao: (value: 'asc' | 'desc') => void;
}

export const NotasFilters: React.FC<NotasFiltersProps> = ({
  busca,
  setBusca,
  filtroStatus,
  setFiltroStatus,
  ordenacao,
  setOrdenacao
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eink-gray w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar nota fiscal..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-10 pr-4 py-2 border border-eink-lightGray rounded-lg focus:outline-none focus:border-eink-gray"
        />
      </div>

      <select
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
        className="px-4 py-2 border border-eink-lightGray rounded-lg focus:outline-none focus:border-eink-gray"
      >
        <option value="todos">Todos os status</option>
        <option value="atrasado">Atrasados</option>
        <option value="alerta-vermelho">Próximo ao vencimento</option>
        <option value="alerta-amarelo">Em andamento</option>
        <option value="alerta-verde">Prazo confortável</option>
      </select>

      <button
        onClick={() => setOrdenacao(prev => prev === 'asc' ? 'desc' : 'asc')}
        className="flex items-center gap-2 px-4 py-2 border border-eink-lightGray rounded-lg hover:bg-eink-lightGray/10"
      >
        <Calendar className="w-4 h-4" />
        {ordenacao === 'asc' ? 'Mais antigos' : 'Mais recentes'}
      </button>
    </div>
  );
};
