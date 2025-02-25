
export const formatarData = (data: Date) => {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const getStatusMessage = (status: string) => {
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

export const getStatusStyle = (status: string) => {
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
