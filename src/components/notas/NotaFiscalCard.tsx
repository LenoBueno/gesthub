
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
    <div className="relative w-full bg-eink-white rounded-lg border border-eink-lightGray shadow-sm md:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.3)]">
      <div className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div>
            <p className="text-eink-gray text-xs md:text-sm uppercase">Razão Social</p>
            <p className="font-medium text-base md:text-lg uppercase truncate">{nota.razaoSocial}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <p className="text-eink-gray text-xs md:text-sm uppercase">Nota Fiscal</p>
              <p className="font-medium text-sm md:text-base uppercase">{nota.numeroNota}</p>
            </div>
            <div>
              <p className="text-eink-gray text-xs md:text-sm uppercase">Emissão</p>
              <p className="font-medium text-sm md:text-base">{formatarData(nota.dataEmissao)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <p className="text-eink-gray text-xs md:text-sm uppercase">Contato</p>
              <p className="font-medium text-sm md:text-base uppercase truncate">{nota.contato}</p>
            </div>
            <div>
              <p className="text-eink-gray text-xs md:text-sm uppercase">Telefone</p>
              <p className="font-medium text-sm md:text-base">{nota.telefone}</p>
            </div>
          </div>

          <div>
            <p className="text-eink-gray text-xs md:text-sm uppercase">Mensagem Enviada</p>
            <p className="font-medium text-sm md:text-base">{formatarData(nota.dataEnvioMensagem)}</p>
          </div>
        </div>

        {nota.status !== 'pendente' && (
          <div className={`mt-3 md:mt-4 p-2 md:p-3 rounded-md uppercase text-xs md:text-sm font-medium ${getStatusStyle(nota.status)}`}>
            {getStatusMessage(nota.status)}
          </div>
        )}
      </div>
    </div>
  );
};
