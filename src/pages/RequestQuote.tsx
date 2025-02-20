
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CONTACTS = {
  "Rafael Filme Pack": "+5554999232189",
  "Patricia Disk Embalagem": "+5554999327677",
  "Patrício Plásticos Luz": "+5551998304704",
  "Marco Akorel": "+5551980882561"
};

const RequestQuote = () => {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState(Object.keys(CONTACTS)[0]);
  const [materials, setMaterials] = useState({
    stretchFilm: false,
    bubbleWrap: false,
    kraftPaper: false,
    corrugatedPaper: false
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!Object.values(materials).some(Boolean)) {
      setStatus('Selecione pelo menos um material');
      return;
    }

    const selectedMaterials = [];
    if (materials.stretchFilm) selectedMaterials.push("- Material: Filme Stretch\n  Peso: 200Kg");
    if (materials.bubbleWrap) selectedMaterials.push("- Material: Plástico Bolha\n  Quantidade: 05 un.");
    if (materials.kraftPaper) selectedMaterials.push("- Material: Bobina Papel Kraft\n  Quantidade: 03 un.");
    if (materials.corrugatedPaper) selectedMaterials.push("- Material: Bobina Papel Ondulado\n  Quantidade: 03 un.");

    const firstName = selectedContact.split(' ')[0];
    const message = `Olá, ${firstName}, tudo bem?\n\n` +
      `Aqui é Lenoir da Gplásticos.\n` +
      `Estou entrando em contato para fazer uma cotação.\n\n` +
      `${selectedMaterials.join('\n\n')}\n\n` +
      `- Horários para entrega: Segunda a Sexta, das 08h às 18h\n` +
      `- Endereço: R. Demétrio Ângelo Tiburi, 1716 - Bela Vista, Caxias do Sul - RS, 95072-150`;

    const phone = CONTACTS[selectedContact as keyof typeof CONTACTS];
    const url = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
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

        <h1 className="text-2xl font-light text-center mb-8">Solicitar Cotação</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <select
            value={selectedContact}
            onChange={(e) => setSelectedContact(e.target.value)}
            className="w-full p-4 bg-eink-lightGray rounded-lg outline-none"
          >
            {Object.keys(CONTACTS).map((contact) => (
              <option key={contact} value={contact}>
                {contact}
              </option>
            ))}
          </select>

          <div className="space-y-4">
            {[
              { key: 'stretchFilm', label: 'FILME STRETCH' },
              { key: 'bubbleWrap', label: 'PLÁSTICO BOLHA' },
              { key: 'kraftPaper', label: 'BOBINA PAPEL KRAFT' },
              { key: 'corrugatedPaper', label: 'BOBINA PAPEL ONDULADO' }
            ].map((item) => (
              <label key={item.key} className="flex items-center space-x-3 p-4 bg-eink-lightGray rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={materials[item.key as keyof typeof materials]}
                  onChange={(e) => setMaterials({...materials, [item.key]: e.target.checked})}
                  className="form-checkbox h-5 w-5 text-eink-black rounded border-eink-gray"
                />
                <span>{item.label}</span>
              </label>
            ))}
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

export default RequestQuote;
