
import React from 'react';
import type { NotaFiscal } from '../../types/NotaFiscal';

interface NotaFiscalCardProps {
  nota: NotaFiscal;
  formatarData: (data: Date) => string;
  getStatusMessage: (status: string) => string;
  getStatusStyle: (status: string) => string;
}

export const NotaFiscalCard: React.FC<NotaFiscalCardProps> = ({
  nota,
  formatarData,
  getStatusMessage,
  getStatusStyle,
}) => {
  return (
    <div className="relative w-full bg-eink-white rounded-lg border border-eink-lightGray shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.3)]">
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
  );
};
