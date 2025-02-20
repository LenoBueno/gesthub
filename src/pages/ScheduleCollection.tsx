
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleCollection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    whatsapp: '',
    name: '',
    city: '',
    volume: '',
    weight: '',
    cubicMeters: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(formData).some(value => !value)) {
      setStatus('Preencha todos os campos');
      return;
    }

    const phone = formData.whatsapp.replace(/\D/g, '');
    const message = `Olá, ${formData.name}, tudo bem?\n\n` +
      `Me chamo Lenoir e falo da Gplásticos\n` +
      `Estou entrando em contato para agendar uma coleta.\n\n` +
      `- CNPJ: 16.914.559/0001-67\n` +
      `- Cidade destino: ${formData.city}\n` +
      `- Volume: ${formData.volume} vol.\n` +
      `- Peso: ${formData.weight} kg\n` +
      `- Cubagem: ${formData.cubicMeters} M³\n` +
      `- Horários para coleta: Segunda a Sexta, das 08h às 18h\n` +
      `- Endereço: R. Demétrio Ângelo Tiburi, 1716 - Bela Vista, Caxias do Sul - RS, 95072-150`;

    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setStatus('Mensagem enviada!');
  };

  return (
    <div className="min-h-screen bg-eink-white text-eink-black animate-fadeIn">
      <div className="max-w-md mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/')}
          className="mb-8 text-eink-gray hover:text-eink-black"
        >
          ← Voltar
        </button>

        <h1 className="text-2xl font-light text-center mb-8">Agendar Coleta</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { key: 'whatsapp', placeholder: 'WhatsApp (com DDD)', type: 'tel' },
            { key: 'name', placeholder: 'Nome do Cliente', type: 'text' },
            { key: 'city', placeholder: 'Cidade Destino', type: 'text' },
            { key: 'volume', placeholder: 'Volume', type: 'text' },
            { key: 'weight', placeholder: 'Peso', type: 'text' },
            { key: 'cubicMeters', placeholder: 'Cubagem', type: 'text' }
          ].map((field) => (
            <div key={field.key}>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                className="w-full p-4 bg-eink-lightGray rounded-lg outline-none"
              />
            </div>
          ))}

          {status && (
            <div className="text-center text-eink-gray">
              {status}
            </div>
          )}

          <button
            type="submit"
            className="w-full p-4 bg-eink-black text-eink-white rounded-lg hover:bg-eink-darkGray transition-colors duration-200"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleCollection;
