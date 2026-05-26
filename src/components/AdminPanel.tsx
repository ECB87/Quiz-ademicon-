import React, { useState } from 'react';
import { FunnelSettings } from '../types';
import { LucideIcon } from './LucideIcon';

interface AdminPanelProps {
  settings: FunnelSettings;
  onSave: (newSettings: FunnelSettings) => void;
  onReset: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ settings, onSave, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState<FunnelSettings>({ ...settings });

  const handleChange = (key: keyof FunnelSettings, value: string | number) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSettings);
    setIsOpen(false);
  };

  const handleRestore = () => {
    if (window.confirm('Deseja realmente redefinir para as configurações padrão do funil?')) {
      onReset();
      setIsOpen(false);
    }
  };

  // Re-sync when props change
  React.useEffect(() => {
    setLocalSettings({ ...settings });
  }, [settings]);

  return (
    <>
      {/* Floating Gear Trigger Button */}
      <button
        id="admin-panel-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all duration-300 hover:scale-110 active:scale-95 border border-red-500/20 cursor-pointer"
        title="Configurar Link e Textos do Funil (Afiliado/Produtor)"
      >
        <LucideIcon name="Settings" className="h-5 w-5 animate-spin-slow" />
      </button>

      {/* Admin Panel Drawer Overlay */}
      {isOpen && (
        <div 
          id="admin-overlay"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Body */}
          <div
            id="admin-drawer"
            className="w-full max-w-md bg-[#121212] text-white p-6 shadow-2xl flex flex-col h-full border-l border-neutral-800 animate-slide-in overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <LucideIcon name="Settings" className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-bold tracking-tight text-white uppercase">
                  Configurações do Funil
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <LucideIcon name="X" className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 mb-6 bg-red-950/20 border border-red-900/40 p-3 rounded-lg">
              <strong>Painel Exclusivo de Controle:</strong> Use este menu para direcionar o funil ao seu Link de Afiliado ou Página de Vendas (Vidus, Kiwify, Hotmart, etc.) e customizar a urgência. As alterações são memorizadas no navegador.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
              {/* Niche / Product title */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                  Nome do Projeto / Método
                </label>
                <input
                  type="text"
                  value={localSettings.nicheTitle}
                  onChange={(e) => handleChange('nicheTitle', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white"
                  required
                />
              </div>

              {/* Redirect link */}
              <div>
                <label className="block text-xs font-semibold text-red-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <span>Link de Redirecionamento (CTA)</span>
                  <LucideIcon name="Lock" className="h-3 w-3 text-red-400" />
                </label>
                <span className="text-[10px] text-neutral-400 block mb-2">
                  Link de checkout, vídeo de vendas (VSL) ou botão final.
                </span>
                <input
                  type="url"
                  value={localSettings.ctaUrl}
                  onChange={(e) => handleChange('ctaUrl', e.target.value)}
                  placeholder="https://kiwify.com.br/...."
                  className="w-full bg-neutral-900 border border-red-900/40 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white font-mono"
                  required
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                  Headline da Landing Page
                </label>
                <textarea
                  value={localSettings.landingHeadline}
                  onChange={(e) => handleChange('landingHeadline', e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white resize-none"
                  required
                />
              </div>

              {/* Sub headline */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                  Sub-Headline da Landing Page
                </label>
                <textarea
                  value={localSettings.landingSubHeadline}
                  onChange={(e) => handleChange('landingSubHeadline', e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white resize-none"
                  required
                />
              </div>

              {/* Button text */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                  Texto do Botão de Compra/Acesso
                </label>
                <input
                  type="text"
                  value={localSettings.ctaText}
                  onChange={(e) => handleChange('ctaText', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Countdown list */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                    Minutos Escassez
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={localSettings.cooldownMinutes}
                    onChange={(e) => handleChange('cooldownMinutes', parseInt(e.target.value) || 5)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Spots counter */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                    Vagas Iniciais
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={localSettings.spotsCount}
                    onChange={(e) => handleChange('spotsCount', parseInt(e.target.value) || 4)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              {/* Scarcity message */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-2">
                  Aviso de Escassez no Banner
                </label>
                <input
                  type="text"
                  value={localSettings.scarcityMessage}
                  onChange={(e) => handleChange('scarcityMessage', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>

              {/* CTA Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-neutral-800 mt-6">
                <button
                  type="button"
                  onClick={handleRestore}
                  className="flex-1 border border-neutral-800 py-2.5 rounded-lg text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  Padrão
                </button>
                <button
                  type="submit"
                  className="flex-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-xs font-black tracking-wider uppercase transition-all shadow-md shadow-red-600/20 hover:scale-102 active:scale-98 cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
