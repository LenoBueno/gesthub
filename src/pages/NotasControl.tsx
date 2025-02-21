
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { NotaFiscal } from "../types/NotaFiscal";
import { Calendar, Filter, Download, Search } from 'lucide-react';

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

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filtrarNotas = () => {
    let notasFiltradas = [...notasAtualizadas];

    // Filtro por status
    if (filtroStatus !== 'todos') {
      notasFiltradas = notasFiltradas.filter(nota => nota.status === filtroStatus);
    }

    // Filtro por busca
    if (busca) {
      const termoBusca = busca.toLowerCase();
      notasFiltradas = notasFiltradas.filter(nota => 
        nota.razaoSocial.toLowerCase().includes(termoBusca) ||
        nota.numeroNota.toLowerCase().includes(termoBusca)
      );
    }

    // Ordenação por data
    notasFiltradas.sort((a, b) => {
      const dataA = new Date(a.dataEnvioMensagem).getTime();
      const dataB = new Date(b.dataEnvioMensagem).getTime();
      return ordenacao === 'asc' ? dataA - dataB : dataB - dataA;
    });

    return notasFiltradas;
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'atrasado':
        return 'Prazo de retirada expirado';
      case 'alerta-vermelho':
        return 'Atenção: 2 dias ou menos para expirar';
      case 'alerta-amarelo':
        return 'Atenção: 3-4 dias para expirar';
      case 'alerta-verde':
        return 'Em andamento: 5-7 dias restantes';
      default:
        return '';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'atrasado':
      case 'alerta-vermelho':
        return 'bg-red-50 text-red-600';
      case 'alerta-amarelo':
        return 'bg-yellow-50 text-yellow-600';
      case 'alerta-verde':
        return 'bg-green-50 text-green-600';
      default:
        return '';
    }
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
            {/* Barra de busca */}
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

            {/* Filtro de status */}
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

            {/* Ordenação */}
            <button
              onClick={() => setOrdenacao(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-2 px-4 py-2 border border-eink-lightGray rounded-lg hover:bg-eink-lightGray/10"
            >
              <Calendar className="w-4 h-4" />
              {ordenacao === 'asc' ? 'Mais antigos' : 'Mais recentes'}
            </button>

            {/* Exportar */}
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
            <div 
              key={index}
              className="relative w-full bg-eink-white rounded-lg border border-eink-lightGray shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.3)]"
            >
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-eink-gray text-sm uppercase">Razão Social</p>
                    <p className="font-medium text-lg uppercase truncate">{nota.razaoSocial}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-eink-gray text-sm uppercase">Nota Fiscal</p>
                      <p className="font-medium uppercase">{nota.numeroNota}</p>
                    </div>
                    <div>
                      <p className="text-eink-gray text-sm uppercase">Emissão</p>
                      <p className="font-medium">{formatarData(nota.dataEmissao)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-eink-gray text-sm uppercase">Contato</p>
                      <p className="font-medium uppercase truncate">{nota.contato}</p>
                    </div>
                    <div>
                      <p className="text-eink-gray text-sm uppercase">Telefone</p>
                      <p className="font-medium">{nota.telefone}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-eink-gray text-sm uppercase">Mensagem Enviada</p>
                    <p className="font-medium">{formatarData(nota.dataEnvioMensagem)}</p>
                  </div>
                </div>

                {nota.status !== 'pendente' && (
                  <div className={`mt-4 p-3 rounded-md uppercase text-sm font-medium ${getStatusStyle(nota.status)}`}>
                    {getStatusMessage(nota.status)}
                  </div>
                )}
              </div>
            </div>
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
