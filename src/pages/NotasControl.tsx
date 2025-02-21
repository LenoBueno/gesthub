
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { NotaFiscal } from "../types/NotaFiscal";

const NotasControl = () => {
  const navigate = useNavigate();
  const [notas] = useLocalStorage<NotaFiscal[]>("notas-fiscais", []);
  const [notasAtualizadas, setNotasAtualizadas] = useState<NotaFiscal[]>([]);

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

    // Atualiza o status a cada minuto
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

  const getCardStyle = (status: string) => {
    const baseStyle = "relative w-full bg-eink-white rounded-lg transition-all duration-300";
    
    switch (status) {
      case 'atrasado':
        return `${baseStyle} border-2 border-[#C30010]`;
      case 'alerta-vermelho':
        return `${baseStyle} border border-eink-lightGray shadow-[0_35px_80px_rgba(195,0,16,0.15)]`;
      case 'alerta-amarelo':
        return `${baseStyle} border border-eink-lightGray shadow-[0_35px_80px_rgba(253,163,0,0.15)]`;
      case 'alerta-verde':
        return `${baseStyle} border border-eink-lightGray shadow-[0_35px_80px_rgba(0,148,64,0.15)]`;
      default:
        return `${baseStyle} border border-eink-lightGray shadow-sm hover:shadow-md`;
    }
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

        <h1 className="text-2xl font-light text-center mb-8 uppercase">Controle de Notas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notasAtualizadas.map((nota, index) => (
            <div 
              key={index}
              className={getCardStyle(nota.status)}
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

        {notasAtualizadas.length === 0 && (
          <div className="text-center text-eink-gray uppercase mt-8">
            Nenhuma nota registrada
          </div>
        )}
      </div>
    </div>
  );
};

export default NotasControl;
