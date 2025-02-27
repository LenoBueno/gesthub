
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { NotaFiscal } from "../types/NotaFiscal";

const ClientPickup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    whatsapp: '',
    contato: '',
    razaoSocial: '',
    invoice: ''
  });
  const [status, setStatus] = useState('');
  const [notas, setNotas] = useLocalStorage<NotaFiscal[]>("notas-fiscais", []);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.whatsapp || !formData.contato || !formData.invoice || !formData.razaoSocial) {
      setStatus('Preencha todos os campos');
      return;
    }

    if (enviado) {
      toast.error("Mensagem já enviada");
      return;
    }

    const phone = formData.whatsapp.replace(/\D/g, '');
    const message = `Olá, ${formData.contato}, tudo bem?\n\n` +
      `Me chamo Lenoir e falo da Gplásticos.\n` +
      `Estou entrando em contato para avisar que a sua mercadoria está pronta para coleta.\n\n` +
      `- Nota Fiscal Nº ${formData.invoice}\n` +
      `- Horários para coleta: Segunda a Sexta, das 08h às 18h\n` +
      `- Endereço: R. Demétrio Ângelo Tiburi, 1716 - Bela Vista, Caxias do Sul - RS, 95072-150`;

    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    
    // Salvar dados da nota
    const novaNota: NotaFiscal = {
      razaoSocial: formData.razaoSocial,
      numeroNota: formData.invoice,
      dataEmissao: new Date(),
      dataEnvioMensagem: new Date(),
      contato: formData.contato,
      telefone: formData.whatsapp,
      status: 'pendente'
    };

    setNotas([...notas, novaNota]);
    setEnviado(true);
    
    window.open(url, '_blank');
    setStatus('Mensagem enviada!');
    toast.success("Nota registrada com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-eink-white text-eink-black animate-fadeIn">
      <div className="flex-grow">
        <div className="max-w-[85%] mx-auto px-4 py-6 md:py-12">
          <button 
            onClick={() => navigate('/')}
            className="mb-6 md:mb-8 text-eink-gray hover:text-eink-black text-sm uppercase"
          >
            ← VOLTAR
          </button>

          <h1 className="text-xl md:text-2xl font-light text-center mb-6 uppercase">Cliente Retira</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="RAZÃO SOCIAL"
                value={formData.razaoSocial}
                onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
                className="w-full p-3 bg-eink-lightGray rounded-lg outline-none text-sm uppercase"
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="WHATSAPP (COM DDD)"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full p-3 bg-eink-lightGray rounded-lg outline-none text-sm uppercase"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="CONTATO"
                value={formData.contato}
                onChange={(e) => setFormData({...formData, contato: e.target.value})}
                className="w-full p-3 bg-eink-lightGray rounded-lg outline-none text-sm uppercase"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="NOTA FISCAL"
                value={formData.invoice}
                onChange={(e) => setFormData({...formData, invoice: e.target.value})}
                className="w-full p-3 bg-eink-lightGray rounded-lg outline-none text-sm uppercase"
              />
            </div>

            {status && (
              <div className="text-center text-eink-gray text-sm uppercase">
                {status}
              </div>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-eink-black text-eink-white rounded-lg hover:bg-eink-darkGray transition-colors duration-200 text-sm uppercase"
            >
              ENVIAR
            </button>
          </form>
        </div>
      </div>
      
      <footer className="w-full py-4 text-xs text-eink-gray text-center">
        © 2025 - desenvolvido por 2103 creative - Desde 2024
      </footer>
    </div>
  );
};

export default ClientPickup;
