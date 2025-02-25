
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { NotaFiscal } from "../types/NotaFiscal";
import { Download } from 'lucide-react';
import { NotasFilters } from '../components/notas/NotasFilters';
import { NotaFiscalCard } from '../components/notas/NotaFiscalCard';
import { formatarData, getStatusMessage, getStatusStyle } from '../utils/notasUtils';

const NotasControl = () => {
  const navigate = useNavigate();
  const [notas] = useLocalStorage<NotaFiscal[]>("notas-fiscais", []);
  const [notasAtualizadas, setNotasAtualizadas] = useState<NotaFiscal[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const atualizarStatus = () => {
      const hoje = new Date();
      return notas.map(nota => {
        const dataLimite = new Date(nota.dataEnvioMensagem);
        dataLimite.setDate(dataLimite.getDate() + 7);
        
        const diasRestantes = Math.ceil((dataLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
        
        let status: 'pendente' | 'atrasado' | 'alerta-verde' | 'alerta-amarelo' | 'alerta-vermelho' = 'pendente';
        
        if (hoje > dataLimite) {
          status = 'atrasado';
        } else if (diasRestantes <= 2) {
          status = 'alerta-vermelho';
        } else if (diasRestantes <= 4) {
          status = 'alerta-amarelo';
        } else if (diasRestantes <= 7) {
          status = 'alerta-verde';
        }
        
        return { ...nota, status };
      });
    };

    setNotasAtualizadas(atualizarStatus());
    const interval = setInterval(() => {
      setNotasAtualizadas(atualizarStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, [notas]);

  const filtrarNotas = () => {
    let notasFiltradas = [...notasAtualizadas];

    if (filtroStatus !== 'todos') {
      notasFiltradas = notasFiltradas.filter(nota => nota.status === filtroStatus);
    }

    if (busca) {
      const termoBusca = busca.toLowerCase();
      notasFiltradas = notasFiltradas.filter(nota => 
        nota.razaoSocial.toLowerCase().includes(termoBusca) ||
        nota.numeroNota.toLowerCase().includes(termoBusca)
      );
    }

    notasFiltradas.sort((a, b) => {
      const dataA = new Date(a.dataEnvioMensagem).getTime();
      const dataB = new Date(b.dataEnvioMensagem).getTime();
      return ordenacao === 'asc' ? dataA - dataB : dataB - dataA;
    });

    return notasFiltradas;
  };

  return (
    <div className="min-h-screen bg-eink-white text-eink-black animate-fadeIn">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/')}
          className="mb-8 text-eink-gray hover:text-eink-black uppercase"
        >
          ← VOLTAR
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-light uppercase mb-4 md:mb-0">Controle de Notas</h1>
          
          <div className="flex flex-wrap gap-4 items-center">
            <NotasFilters
              busca={busca}
              setBusca={setBusca}
              filtroStatus={filtroStatus}
              setFiltroStatus={setFiltroStatus}
              ordenacao={ordenacao}
              setOrdenacao={setOrdenacao}
            />

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border border-eink-lightGray rounded-lg hover:bg-eink-lightGray/10"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrarNotas().map((nota, index) => (
            <NotaFiscalCard
              key={index}
              nota={nota}
              formatarData={formatarData}
              getStatusMessage={getStatusMessage}
              getStatusStyle={getStatusStyle}
            />
          ))}
        </div>

        {filtrarNotas().length === 0 && (
          <div className="text-center text-eink-gray uppercase mt-8">
            Nenhuma nota encontrada
          </div>
        )}
      </div>
    </div>
  );
};

export default NotasControl;
