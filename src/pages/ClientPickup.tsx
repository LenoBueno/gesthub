
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientPickup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    whatsapp: '',
    name: '',
    invoice: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.whatsapp || !formData.name || !formData.invoice) {
      setStatus('Preencha todos os campos');
      return;
    }

    const phone = formData.whatsapp.replace(/\D/g, '');
    const message = `Olá, ${formData.name}, tudo bem?\n\n` +
      `Me chamo Lenoir e falo da Gplásticos.\n` +
      `Estou entrando em contato para avisar que a sua mercadoria está pronta para coleta.\n\n` +
      `- Nota Fiscal Nº ${formData.invoice}\n` +
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

        <h1 className="text-2xl font-light text-center mb-8">Cliente Retira</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="tel"
              placeholder="WhatsApp (com DDD)"
              value={formData.whatsapp}
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              className="w-full p-4 bg-eink-lightGray rounded-lg outline-none"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Nome do Cliente"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 bg-eink-lightGray rounded-lg outline-none"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Nota Fiscal"
              value={formData.invoice}
              onChange={(e) => setFormData({...formData, invoice: e.target.value})}
              className="w-full p-4 bg-eink-lightGray rounded-lg outline-none"
            />
          </div>

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

export default ClientPickup;
