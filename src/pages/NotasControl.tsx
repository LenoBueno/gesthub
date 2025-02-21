
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
        
        if (nota.status !== 'cancelado' && hoje > dataLimite) {
          return { ...nota, status: 'atrasado' };
        }
        return nota;
      });
    };

    setNotasAtualizadas(atualizarStatus());
  }, [notas]);

  const formatarData = (data: Date) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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

        <div className="grid gap-6">
          {notasAtualizadas.map((nota, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg shadow-sm ${
                nota.status === 'atrasado' 
                  ? 'bg-red-50' 
                  : 'bg-eink-lightGray'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-eink-gray uppercase text-sm">Razão Social</p>
                  <p className="font-medium uppercase">{nota.razaoSocial}</p>
                </div>
                <div>
                  <p className="text-eink-gray uppercase text-sm">Nota Fiscal</p>
                  <p className="font-medium uppercase">{nota.numeroNota}</p>
                </div>
                <div>
                  <p className="text-eink-gray uppercase text-sm">Emissão</p>
                  <p className="font-medium">{formatarData(nota.dataEmissao)}</p>
                </div>
                <div>
                  <p className="text-eink-gray uppercase text-sm">Mensagem Enviada</p>
                  <p className="font-medium">{formatarData(nota.dataEnvioMensagem)}</p>
                </div>
                <div>
                  <p className="text-eink-gray uppercase text-sm">Contato</p>
                  <p className="font-medium uppercase">{nota.contato}</p>
                </div>
                <div>
                  <p className="text-eink-gray uppercase text-sm">Telefone</p>
                  <p className="font-medium">{nota.telefone}</p>
                </div>
              </div>
              {nota.status === 'atrasado' && (
                <div className="mt-4 text-red-600 uppercase text-sm font-medium">
                  Prazo de retirada expirado
                </div>
              )}
            </div>
          ))}

          {notasAtualizadas.length === 0 && (
            <div className="text-center text-eink-gray uppercase">
              Nenhuma nota registrada
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotasControl;
