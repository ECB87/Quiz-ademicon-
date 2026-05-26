import React, { useState, useEffect } from 'react';
import { LucideIcon } from './LucideIcon';

interface NotificationItem {
  name: string;
  location: string;
  action: string;
  timeAgo: string;
}

const CONVERSION_MOCKS: NotificationItem[] = [
  { name: 'Lucas Pinheiro', location: 'Balneário Camboriú/SC', action: 'acabou de simular consórcio imobiliário de R$ 350.000', timeAgo: 'agora mesmo' },
  { name: 'Juliana Sampaio', location: 'Ribeirão Preto/SP', action: 'garantiu cota com taxa reduzida para seu carro zero', timeAgo: 'há 1 min' },
  { name: 'Pedro Henrique G.', location: 'Goiânia/GO', action: 'simulou cronograma com Lance Embutido de 30%', timeAgo: 'agora mesmo' },
  { name: 'Gabriela Vasconcelos', location: 'Recife/PE', action: 'simulou uso do FGTS para sua nova casa própria', timeAgo: 'há 2 min' },
  { name: 'Marcos André', location: 'Niterói/RJ', action: 'acaba de simular troca de financiamento abusivo por cota Ademicon', timeAgo: 'há 3 min' },
  { name: 'Fernanda Lima', location: 'Porto Alegre/RS', action: 'simulou carta de crédito imobiliária de R$ 600.000', timeAgo: 'agora mesmo' },
  { name: 'Thiago Martins', location: 'Belo Horizonte/MG', action: 'simulou plano de parcelas sem juros para veículo SUV', timeAgo: 'há 1 min' }
];

export const NotificationToast: React.FC = () => {
  const [current, setCurrent] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first toast shown
    const initialTimer = setTimeout(() => {
      triggerNotification();
    }, 4500);

    const intervalTimer = setInterval(() => {
      triggerNotification();
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  const triggerNotification = () => {
    const randomIndex = Math.floor(Math.random() * CONVERSION_MOCKS.length);
    setCurrent(CONVERSION_MOCKS[randomIndex]);
    setIsVisible(true);

    // Hide after 4.5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4500);
  };

  if (!current || !isVisible) return null;

  return (
    <div
      id="conversion-toast"
      className="fixed bottom-6 left-6 z-40 bg-[#121212]/95 border-l-4 border-red-600 rounded-lg shadow-xl shadow-black/50 p-4 max-w-sm flex items-start gap-3 border border-neutral-800 backdrop-blur-md transition-all duration-500 transform translate-y-0 sm:block hidden hover:scale-102 cursor-pointer"
    >
      <div className="bg-red-950/40 p-2 rounded-full border border-red-500/20 text-red-500 mt-0.5">
        <LucideIcon name="CheckCircle" className="h-4 w-4" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-xs font-bold text-neutral-100 truncate">{current.name}</p>
          <span className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded uppercase font-mono">
            {current.timeAgo}
          </span>
        </div>
        <p className="text-[10px] text-neutral-400 font-mono mb-1">{current.location}</p>
        <p className="text-[11px] text-neutral-300">
          {current.action} <span className="text-red-500 font-semibold font-sans">✓</span>
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-neutral-500 hover:text-white transition-colors self-start cursor-pointer"
      >
        <LucideIcon name="X" className="h-3 w-3" />
      </button>
    </div>
  );
};
export default NotificationToast;
