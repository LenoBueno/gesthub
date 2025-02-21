
export interface NotaFiscal {
  razaoSocial: string;
  numeroNota: string;
  dataEmissao: Date;
  dataEnvioMensagem: Date;
  contato: string;
  telefone: string;
  status: 'pendente' | 'atrasado' | 'alerta-verde' | 'alerta-amarelo' | 'alerta-vermelho';
}
