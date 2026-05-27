import React, { useState, useEffect } from 'react';
import { QuizOption, QuizStep, FunnelSettings } from './types';
import { QUIZ_STEPS, DEFAULT_SETTINGS, FAQ_ITEMS } from './data';
import { LucideIcon } from './components/LucideIcon';
import { NotificationToast } from './components/NotificationToast';
import { FaqSection } from './components/FaqSection';
import { SocialFeedback } from './components/SocialFeedback';
import dreamHero from './assets/images/dream_hero_1779758741967.png';

// MELHORIA: Função para calcular o score de compatilidade real dinamicamente entre 82% e 97%
function calcCompatibilityScore(answers: Record<string, string>): number {
  let score = 84; // base score
  if (!answers) return score;
  
  if (answers['urgencia'] === 'Antecipação rápida com aporte') score += 5;
  if (answers['urgencia'] === 'Uso do mecanismo interno de resgate') score += 3;
  if (answers['situacao'] === 'FGTS / Reservas inativas utilizáveis') score += 4;
  if (answers['situacao'] === 'Bens usados para avaliação de resgate') score += 3;
  if (answers['parcela'] && !answers['parcela'].includes('R$ 300')) score += 2;
  
  return Math.min(score, 97); // nunca retornar 100%
}

// MELHORIA: Tipo de retorno do laudo de diagnóstico financeiro do lead
interface Diagnosis {
  estrategia: string;
  prazo: string;
  economia: string;
  destaque: string;
  detalhes: string;
}

// MELHORIA: Lógica de geração de diagnóstico personalizado baseado em pelo menos 6 combinações diferentes
function generateDiagnosis(answers: Record<string, string>): Diagnosis {
  const sonho = answers['sonho'] || 'Seu Sonho Patrimonial';
  const urgencia = answers['urgencia'] || '';
  const situacao = answers['situacao'] || '';
  const parcela = answers['parcela'] || 'Sob medida';
  const valor = answers['renda_meta'] || 'Sob medida';

  const isUrgente = urgencia.includes('Antecipação');
  const isPlanejado = urgencia.includes('mecanismo');
  const temFGTS = situacao.includes('FGTS');
  const temBem = situacao.includes('Bens');
  const isImovel = sonho.includes('Casa') || sonho.includes('Terreno');
  const isAutomovel = sonho.includes('Carro') || sonho.includes('Veículo');

  // Combinação 1: Urgente + FGTS
  if (isUrgente && temFGTS) {
    return {
      estrategia: 'Crédito Acelerado por Lance com Depósito de FGTS',
      prazo: '3 a 6 meses',
      economia: 'Até 65% de economia em taxas frente aos juros abusivos de financiamentos de longa duração',
      destaque: 'Uso imediato do seu saldo parado de FGTS como base de lance em lote para antecipar a posse do bem.',
      detalhes: `Excelente combinação para quem possui saldo inativo ou ativo. Sua carta de crédito no valor de ${valor} poderá ser liberada sem precisar de aportes do seu orçamento regular hoje.`
    };
  }

  // Combinação 2: Urgente + Outras Opções (Lance Embutido Integrado)
  if (isUrgente) {
    return {
      estrategia: 'Alocação Acelerada com Amortização por Lance Embutido',
      prazo: '4 a 9 meses',
      economia: 'Economia estimada superior a R$ 90.000 em taxas eliminadas',
      destaque: 'Aplicação de lance fixo de até 30% descontável do próprio crédito contratado para adiantar faturamento sem descapitalizar.',
      detalhes: `Indicado para agilizar o resgate para conquistar seu(sua) ${sonho}. Ideal para enquadrar parcelas de ${parcela} com foco em resgate rápido.`
    };
  }

  // Combinação 3: Planejado + Imóvel
  if (isImovel && isPlanejado) {
    return {
      estrategia: 'Consórcio de Imóveis Planejado com Lance Fixo Integrado',
      prazo: '10 a 15 meses',
      economia: 'Mais de R$ 130.000 economizados se comparados à triplicação de valores do SFH tradicional',
      destaque: 'Associação a grupo estruturado de consórcio regulado com ótimo enquadramento de parcelas em ${parcela} e alta taxa de contemplação média.',
      detalhes: `Perfeito para a compra de imóveis familiares ou terrenos sem juros. Permite desenhar o aporte sem comprometer os custos essenciais da residência atual.`
    };
  }

  // Combinação 4: Planejado + Veículo
  if (isAutomovel && isPlanejado) {
    return {
      estrategia: 'Consórcio Veicular sob Medida com Lance Facilitado',
      prazo: '6 a 11 meses',
      economia: 'Até R$ 42.000 em eliminação total de taxas rotativas de leasing e CDC veicular',
      destaque: 'Possibilidade jurídica de empenhar veículo atual ou bônus interno para viabilizar faturamentos ágeis sem burocracia.',
      detalhes: `Indicado para renovação planejada de garagem ou frotas corporativas de valor estimado em ${valor}, pagando confortavelmente ${parcela}.`
    };
  }

  // Combinação 5: Investimentos / Aposentadoria de Elite
  if (sonho.includes('Investimentos') || sonho.includes('Aposentadoria')) {
    return {
      estrategia: 'Alavancagem de Investimentos via Crédito Blindado',
      prazo: 'Livre / Formação de Patrimônio',
      economia: 'Custo de administração simbólico de em média 0.11% ao mês (taxas de financiamento eliminadas)',
      destaque: 'Ideal para rentabilização de médio prazo e acumulação constante de cotas de investimento isentas de juros compostos cobrados por bancos comuns.',
      detalhes: `Permite a criação de uma blindagem de carteira, focando em renda passiva por aluguéis ou ganhos de capital de alta performance no montante de ${valor}.`
    };
  }

  // Combinação 6: Geral / Fallback Saudável
  return {
    estrategia: 'Planejamento de Crédito Saudável por Contemplação Natural ou Lance',
    prazo: '8 a 13 meses',
    economia: 'Economia garantida de no mínimo 50% sobre os custos de bancos convencionais',
    destaque: 'Contemplação direcionada e consultoria credenciada individual para planejar mensalidades justas com flexibilidade máxima.',
    detalhes: `Estruturação sob medida para adquirir seu(sua) ${sonho} de valor ${valor} com parcelas reduzidas de ${parcela} totalmente ajustáveis.`
  };
}

export default function App() {
  // Screens state: 'landing' | 'gate' | 'restricted' | 'quiz' | 'analyzing' | 'result' | 'capture'
  const [screen, setScreen] = useState<'landing' | 'gate' | 'restricted' | 'quiz' | 'analyzing' | 'result' | 'capture'>('landing');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // States for high-converting capture lead screen
  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Settings state loaded directly from default configuration, ignoring stale user configs
  const [settings, setSettings] = useState<FunnelSettings>(DEFAULT_SETTINGS);

  // Clear stale localStorage key on mount
  useEffect(() => {
    try {
      localStorage.removeItem('funnel_settings_v1');
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Save progress in sessionStorage
  useEffect(() => {
    if (screen === 'quiz') {
      try {
        sessionStorage.setItem('quiz_progress', JSON.stringify({ currentStep, answers }));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [currentStep, answers, screen]);

  // Restore progress on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('quiz_progress');
      if (saved) {
        const { currentStep: step, answers: ans } = JSON.parse(saved);
        if (ans && Object.keys(ans).length > 0) {
          setAnswers(ans);
          setCurrentStep(step);
          setScreen('quiz');
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Urgency State
  const [spotsLeft, setSpotsLeft] = useState(settings.spotsCount);
  const [countdown, setCountdown] = useState(settings.cooldownMinutes * 60);

  // Analyzing state loaders
  const [checkingProgress, setCheckingProgress] = useState(0);
  const [checksList, setChecksList] = useState([
    { text: 'Analisando dados do bem ou patrimônio desejado...', status: 'loading' },
    { text: 'Verificando limites de parcelas vs. orçamento do perfil...', status: 'pending' },
    { text: 'Mapeando canais de planejamento fechados com maiores taxas de liberação...', status: 'pending' },
    { text: 'Buscando bônus de alavancagem embutidos e lotes de liberação...', status: 'pending' }
  ]);

  // Sync settings when modified
  const handleSaveSettings = (newSettings: FunnelSettings) => {
    setSettings(newSettings);
    setSpotsLeft(newSettings.spotsCount);
    setCountdown(newSettings.cooldownMinutes * 60);
    localStorage.setItem('funnel_settings_v1', JSON.stringify(newSettings));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setSpotsLeft(DEFAULT_SETTINGS.spotsCount);
    setCountdown(DEFAULT_SETTINGS.cooldownMinutes * 60);
    localStorage.removeItem('funnel_settings_v1');
  };

  // Live scarcity simulator (ticks down spots remaining to increase conversions)
  useEffect(() => {
    if (spotsLeft <= 1) return;
    
    // Decrease spot count randomly every 15-30 seconds
    const delay = 15000 + Math.random() * 15000;
    const timer = setTimeout(() => {
      setSpotsLeft((prev) => Math.max(1, prev - 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [spotsLeft]);

  // Countdown clock ticker on final page (does NOT block CTA anymore)
  useEffect(() => {
    if (screen !== 'result' || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, countdown]);

  // Analyzing Profile Simulation
  useEffect(() => {
    if (screen !== 'analyzing') return;

    const interval = setInterval(() => {
      setCheckingProgress((prev) => {
        const next = prev + 1;
        
        // Update checkmarks based on progress
        if (next === 25) {
          setChecksList((prevList) => [
            { ...prevList[0], status: 'success' },
            { ...prevList[1], status: 'loading' },
            prevList[2],
            prevList[3]
          ]);
        } else if (next === 50) {
          setChecksList((prevList) => [
            prevList[0],
            { ...prevList[1], status: 'success' },
            { ...prevList[2], status: 'loading' },
            prevList[3]
          ]);
        } else if (next === 75) {
          setChecksList((prevList) => [
            prevList[0],
            prevList[1],
            { ...prevList[2], status: 'success' },
            { ...prevList[3], status: 'loading' }
          ]);
        } else if (next >= 100) {
          setChecksList((prevList) => [
            prevList[0],
            prevList[1],
            prevList[2],
            { ...prevList[3], status: 'success' }
          ]);
          clearInterval(interval);
          setTimeout(() => {
            setScreen('result');
          }, 600);
          return 100;
        }
        
        return next;
      });
    }, 45); // Takes about 4.5 seconds to compute

    return () => clearInterval(interval);
  }, [screen]);

  // Reset entire quiz to start over
  const startQuiz = () => {
    try {
      sessionStorage.removeItem('quiz_progress');
    } catch (e) {
      console.warn(e);
    }
    setAnswers({});
    setCurrentStep(0);
    setCheckingProgress(0);
    setSelectedOptionId(null);
    setChecksList([
      { text: 'Analisando dados do bem ou patrimônio desejado...', status: 'loading' },
      { text: 'Verificando limites de parcelas vs. orçamento do perfil...', status: 'pending' },
      { text: 'Mapeando canais de planejamento fechados com maiores taxas de liberação...', status: 'pending' },
      { text: 'Buscando bônus de alavancagem embutidos e lotes de liberação...', status: 'pending' }
    ]);
    setScreen('quiz');
  };

  // Handle option select with visual advanced feedback delay
  const handleSelectOption = (stepId: string, option: QuizOption) => {
    setSelectedOptionId(option.id);
    const updatedAnswers = { ...answers, [stepId]: option.value };
    setAnswers(updatedAnswers);

    // Short tactile delay so the user feels the selection click and the red color glow active
    setTimeout(() => {
      setSelectedOptionId(null);
      if (currentStep < QUIZ_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // MELHORIA: Personalizar checklist da tela de Análise com respostas do lead
        const sonhoStr = updatedAnswers['sonho'] ? `para "${updatedAnswers['sonho']}"` : 'da meta patrimonial';
        const valorStr = updatedAnswers['renda_meta'] ? `de ${updatedAnswers['renda_meta']}` : 'dos valores necessários';
        const urgenciaStr = updatedAnswers['urgencia'] ? `estratégia para "${updatedAnswers['urgencia']}"` : 'dos cronogramas';
        const situacaoStr = updatedAnswers['situacao'] ? `por meio de "${updatedAnswers['situacao']}"` : 'dos potencializadores';

        setChecksList([
          { text: `Analisando dados e viabilidade patrimonial ${sonhoStr}...`, status: 'loading' },
          { text: `Verificando limites de parcelas de ${valorStr} vs. orçamento...`, status: 'pending' },
          { text: `Simulando caminhos inteligentes baseados em "${urgenciaStr}"...`, status: 'pending' },
          { text: `Buscando propostas otimizadas focando em "${situacaoStr}"...`, status: 'pending' }
        ]);
        setScreen('analyzing');
      }
    }, 400);
  };

  const handleBackProgress = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setScreen('landing');
    }
  };

  const formatCountdownTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Submit contact lead info and redirect to WhatsApp prefilled message
  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) return;

    setIsSubmitting(true);
    
    const compatibilityScore = calcCompatibilityScore(answers);
    const leadData = {
      nome: nome.trim(),
      telefone: telefone.trim(),
      cidade: cidade.trim(),
      answers,
      score: compatibilityScore,
      timestamp: new Date().toISOString()
    };

    // 1. Opcionalmente despachar para webhook configurador (CRM) de forma assíncrona tolerante
    try {
      await fetch(settings.webhookUrl || 'https://seu-crm.com/webhook/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
    } catch (e) {
      console.warn('Webhook dispatch failed (common if offline):', e);
    }

    // 2. Format a highly professional, polite, humanized message summary for WhatsApp
    const msgText = `Olá! Acabei de completar o Mapeamento de Planejamento Patrimonial Ademicon.\n\n` +
      `Meus Dados:\n` +
      `• Nome: ${nome.trim()}\n` +
      `• Contato: ${telefone.trim()}\n` +
      `• Cidade: ${cidade.trim() || 'Não informada'}\n\n` +
      `Minha Simulação:\n` +
      `🎯 Objetivo: ${answers['sonho'] || 'Construir patrimônio'}\n` +
      `📅 Prazo/Urgência: ${answers['urgencia'] || 'Prazo planejado'}\n` +
      `💰 Faixa de Crédito: ${answers['renda_meta'] || 'Sob consulta'}\n` +
      `💸 Parcela Estimada: ${answers['parcela'] || 'Sob consulta'}\n` +
      `⚡ Potencializador: ${answers['situacao'] || 'Não informado'}\n` +
      `📈 Diagnóstico de Compatibilidade: ${compatibilityScore}%\n\n` +
      `Quero liberar o meu planejamento completo, receber a planilha de parcelas reduzidas oficiais e falar com o especialista!`;

    const finalUrl = `https://wa.me/5511985075761?text=${encodeURIComponent(msgText)}`;

    // Clear session storage so if they come back they can redo it
    try {
      sessionStorage.removeItem('quiz_progress');
    } catch (err) {}

    // Redirect to final URL
    setIsSubmitting(false);
    window.location.href = finalUrl;
  };

  // Helper values for dynamic result rendering
  const scoreVal = calcCompatibilityScore(answers);
  const diagnosisDetails = generateDiagnosis(answers);

  return (
    <div id="funnel-container" className="min-h-screen bg-black text-neutral-100 font-sans relative antialiased flex flex-col selection:bg-red-600 selection:text-white pb-16">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.08),rgba(0,0,0,0))] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      {/* Scarcity Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 shadow-md z-10 border-b border-red-700 font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-xs font-black uppercase">
          <span className="inline-block h-2 w-2 rounded-full bg-white animate-ping"></span>
          <span>{settings.scarcityMessage}</span>
          <span className="hidden sm:inline bg-black/30 px-2 py-0.5 rounded font-mono">
            {spotsLeft} Vagas Restantes
          </span>
        </div>
      </div>

      {/* Main Container Wrapper */}
      <main id="main-content" className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 relative z-10">

        {/* ========================================================= */}
        {/* 1. LANDING SCREEN VIEW */}
        {/* ========================================================= */}
        {screen === 'landing' && (
          <div id="screen-landing" className="flex flex-col gap-12 mt-4 animate-fade-in">
            {/* Header Niche */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full py-1 px-4 mb-4">
                <LucideIcon name="Gift" className="h-4 w-4 text-red-500" />
                <span className="text-[10px] font-bold tracking-widest text-neutral-300 uppercase font-mono">
                  {settings.nicheTitle}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                <span className="text-[10px] text-red-500 font-bold tracking-wider font-mono">100% GRATUITO</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white hover:text-neutral-100 uppercase tracking-tight leading-none">
                {settings.landingHeadline}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl mx-auto mt-4 font-sans">
                {settings.landingSubHeadline}
              </p>
            </div>

            {/* Middle Section: Hero Image & Immediate Action Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border border-neutral-800 bg-neutral-950/40 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl -z-10"></div>
              
              {/* Image Side */}
              <div className="md:col-span-6 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-lg group">
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent h-24 z-10"></div>
                  <img
                    src={dreamHero}
                    alt="Realizando Sonhos Hero"
                    referrerPolicy="no-referrer"
                    className="w-full object-cover aspect-video sm:aspect-auto sm:h-[280px] group-hover:scale-103 transition-transform duration-700"
                  />
                  {/* Floating Micro-Badge */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-[#121212]/90 border border-red-900/40 py-1 px-2.5 rounded-lg text-white font-mono text-[9px] uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    Planejamento de Conquista Patrimonial 2026
                  </div>
                </div>
              </div>

              {/* Action Side */}
              <div className="md:col-span-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-black tracking-wider text-rose-500 uppercase font-sans">
                    Planejamento Patrimonial Seguro e Sem Juros
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mt-2">
                    Esqueça o peso das parcelas infinitas e dos juros altos dos financiamentos bancários de 30 anos. Nosso método inteligente de planejamento ajuda você a simular mensalidades justas que cabem no seu bolso real, trazendo caminhos saudáveis de aceleração e resgate para a sua casa própria, automóvel ou investimentos, sempre preservando as suas economias pessoais.
                  </p>
                </div>

                {/* Conversion Badges */}
                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-center">
                    <p className="text-[10px] text-neutral-400 font-mono uppercase">Leva menos de</p>
                    <p className="text-sm font-bold text-white font-sans">60 Segundos</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-center">
                    <p className="text-[10px] text-neutral-400 font-mono uppercase">Economia de até</p>
                    <p className="text-sm font-bold text-red-500 font-sans">60% vs Banco</p>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-xl text-center">
                    <p className="text-[10px] text-neutral-400 font-mono uppercase">Consultoria</p>
                    <p className="text-sm font-bold text-white font-sans">Inclusa</p>
                  </div>
                </div>

                {/* Main Action Trigger */}
                <div className="pt-2">
                  <button
                    id="cta-start-quiz"
                    onClick={() => setScreen('gate')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white p-4.5 rounded-xl font-black text-sm tracking-widest uppercase shadow-lg shadow-red-600/30 transition-all active:scale-98 select-none hover:scale-102 flex items-center justify-center gap-2 border border-red-500/20 cursor-pointer animate-pulse"
                  >
                    <span>{settings.ctaText}</span>
                    <LucideIcon name="ArrowRight" className="h-4 w-4" />
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 font-mono mt-2.5">
                    Leva apenas 1 minuto • Seu perfil avaliado instantaneamente
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Reviews Sections */}
            <div className="space-y-8 bg-neutral-950/20 p-6 sm:p-8 rounded-2xl border border-neutral-900/80">
              <div className="text-center">
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest font-mono mb-1">
                  COMUNIDADE & RECONHECIMENTO
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-white hover:text-neutral-100 uppercase tracking-wide">
                  Quem Já Testou Nosso Diagnóstico Recomenda:
                </h2>
                <div className="h-1 w-12 bg-red-600 mx-auto mt-2.5"></div>
              </div>
              <SocialFeedback />
            </div>

            {/* Beautiful HTML FAQ Accordion List */}
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest font-mono mb-1">
                  DÚVIDAS FREQUENTES
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
                  Perguntas e Respostas Úteis
                </h2>
                <div className="h-1 w-12 bg-red-600 mx-auto mt-2.5"></div>
              </div>
              <FaqSection items={FAQ_ITEMS} />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 1A. CREDIT QUALIFICATION GATE ("ETAPA ZERO") */}
        {/* ========================================================= */}
        {screen === 'gate' && (
          <div id="screen-gate" className="max-w-xl mx-auto py-6 mt-6 animate-fade-in">
            {/* Header / Nav Back */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setScreen('landing')}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors py-1 px-3 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer animate-fade-in"
              >
                <LucideIcon name="Play" className="h-3 w-3 rotate-180" />
                <span>Voltar</span>
              </button>
              <span className="text-xs font-mono text-red-500 font-bold uppercase">
                Etapa Preliminar
              </span>
            </div>

            <div className="bg-[#0b0c0c] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-red-600"></div>

              <div className="text-center space-y-4 mb-8">
                <div className="h-12 w-12 bg-red-950/40 text-red-500 border border-red-900/60 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <LucideIcon name="ShieldAlert" className="h-6 w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white hover:text-neutral-100 uppercase tracking-tight">
                  Verificação de Viabilidade Inicial
                </h2>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Para podermos prosseguir e simular as condições de contemplação por parcelas amigáveis, precisamos verificar seu enquadramento inicial.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-950 border border-neutral-900/80 p-4.5 rounded-xl text-center">
                  <p className="text-xs sm:text-sm font-bold text-neutral-200">
                    Você já possui alguma restrição ativa de crédito (CPF negativado)?
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 font-sans">
                  <button
                    onClick={startQuiz}
                    className="w-full text-left p-4 rounded-xl border border-neutral-850 bg-neutral-900/30 hover:border-red-600/50 hover:bg-neutral-900/60 transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-900 text-emerald-500 flex-shrink-0 group-hover:bg-emerald-950/20 group-hover:border-emerald-900/50">
                        <LucideIcon name="Smile" className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-red-500">
                          Não, estou com o CPF limpo.
                        </p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                          Seguir para a simulação de prazos e planejamento patrimonial.
                        </p>
                      </div>
                    </div>
                    <LucideIcon name="Play" className="h-3 w-3 text-neutral-600 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={() => setScreen('restricted')}
                    className="w-full text-left p-4 rounded-xl border border-neutral-850 bg-neutral-900/30 hover:border-red-600/50 hover:bg-neutral-900/60 transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-900 text-red-500 flex-shrink-0 group-hover:bg-red-950/20 group-hover:border-red-900/50">
                        <LucideIcon name="ShieldAlert" className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-red-500">
                          Sim, possuo restrições ativas.
                        </p>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                          Visualizar alternativas corporativas de apoio regulado.
                        </p>
                      </div>
                    </div>
                    <LucideIcon name="Play" className="h-3 w-3 text-neutral-600 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>

              <div className="border-t border-neutral-900 pt-5 mt-6 flex items-center gap-1.5 justify-center text-[10px] text-neutral-500 font-mono">
                <LucideIcon name="Lock" className="h-3 w-3" />
                <span>Planejamento em conformidade regulada pelo Banco Central</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 1B. SUPPORT SCREEN FOR RESTRICTED LEADS (HUMANIZED) */}
        {/* ========================================================= */}
        {screen === 'restricted' && (
          <div id="screen-restricted" className="max-w-xl mx-auto py-6 mt-6 animate-fade-in">
            <div className="bg-[#0b0c0c] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-red-600"></div>

              <div className="text-center space-y-4 mb-6">
                <div className="h-12 w-12 bg-emerald-950/40 text-emerald-500 border border-emerald-900/60 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <LucideIcon name="CheckCircle" className="h-6 w-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white hover:text-neutral-100 uppercase tracking-tight">
                  Temos Roteiros Alternativos Para Você!
                </h2>
                <p className="text-xs text-neutral-300 leading-relaxed max-w-md mx-auto font-sans">
                  Entendemos perfeitamente o seu momento. Ter restrições de CPF não impossibilita você de planejar conquistas! 
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-900 p-5 rounded-xl space-y-3.5 text-xs text-neutral-300 leading-relaxed font-sans">
                <p>
                  Nós possuímos <strong>convênios exclusivos</strong> com assessorias credenciadas de regularização de crédito e caminhos amigáveis autorizados pelo Banco Central para ajudar e reabilitar o seu CPF, permitindo prosseguir com a liberação de suas cartas de faturamento de forma paralela ao seu planejamento.
                </p>
                <div className="h-px bg-neutral-900"></div>
                <p className="text-[11px] font-mono text-neutral-400">
                  Um especialista em apoio a regularizações está de plantão para te orientar em sigilo, de maneira 100% livre de constrangimentos ou taxas iniciais abusivas.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href="https://wa.me/5511985075761?text=Olá!%20Realizei%20o%20Mapeamento%20Patrimonial%20Ademicon%20e%20gostaria%20de%20conversar%20sobre%20regularização%20de%20CPF%20para%20planejar%20meu%20crédito."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4.5 rounded-xl font-bold text-xs tracking-widest uppercase shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 border border-emerald-500/20 cursor-pointer animate-pulse"
                >
                  <LucideIcon name="MessageSquare" className="h-4.5 w-4.5" />
                  <span>Falar com Orientador de Crédito no WhatsApp</span>
                </a>

                <button
                  onClick={() => setScreen('landing')}
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-450 hover:text-white p-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Voltar para o Início
                </button>
              </div>

              <div className="border-t border-neutral-900 pt-5 mt-6 flex items-center gap-1.5 justify-center text-[10px] text-neutral-500 font-mono">
                <LucideIcon name="Lock" className="h-3 w-3 text-emerald-500" />
                <span>Atendimento confidencial e privado • Normas LGPD</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. ACTIVE QUIZ STEP CARD VIEW */}
        {/* ========================================================= */}
        {screen === 'quiz' && (
          <div id="screen-quiz" className="max-w-xl mx-auto py-4 mt-6 animate-fade-in">
            
            {/* Nav Back Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleBackProgress}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors py-1 px-3 bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer"
              >
                <LucideIcon name="Play" className="h-3 w-3 rotate-180" />
                <span>Voltar</span>
              </button>
              
              <div className="text-right">
                <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded text-red-500 font-mono font-bold uppercase tracking-wider mr-2">
                  {QUIZ_STEPS[currentStep].stepTitle || 'Etapa'}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Questão {currentStep + 1} de {QUIZ_STEPS.length}
                </span>
              </div>
            </div>

            {/* Form Step Body Wrapper */}
            <div className="bg-[#0b0c0c] border border-neutral-800/85 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-neutral-800">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_STEPS.length) * 100}%` }}
                ></div>
              </div>

              {/* Step info titles */}
              <div className="space-y-1 mb-8">
                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase leading-tight font-sans">
                  {QUIZ_STEPS[currentStep].question}
                </h2>
                {QUIZ_STEPS[currentStep].subQuestion && (
                  <p className="text-xs text-neutral-400">
                    {QUIZ_STEPS[currentStep].subQuestion}
                  </p>
                )}
              </div>

              {/* Card visual choices selector layout */}
              <div className="grid grid-cols-1 gap-3.5">
                {QUIZ_STEPS[currentStep].options?.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(QUIZ_STEPS[currentStep].id, option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'border-red-600 bg-red-950/20 shadow-md shadow-red-600/10'
                          : 'border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700/80 hover:bg-neutral-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Dynamic Custom Color Icons */}
                        {option.iconName && (
                          <div className={`p-2 rounded-lg border flex-shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-neutral-900 border-neutral-800 text-red-500 group-hover:bg-neutral-850'
                          }`}>
                            <LucideIcon name={option.iconName} className="h-4.5 w-4.5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {option.label}
                          </p>
                          {option.description && (
                            <p className="text-[10px] text-neutral-404 font-mono mt-0.5 truncate pr-1">
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Indicator checkbox */}
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-red-600 border-red-500 scale-105'
                          : 'border-neutral-700 group-hover:border-neutral-500'
                      }`}>
                        {isSelected && <LucideIcon name="Check" className="h-3 w-3 text-white stroke-[3px]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scarcity / Micro metrics inside card */}
              <div className="border-t border-neutral-900/90 pt-5 mt-6 flex items-center gap-1.5 justify-center text-[10px] text-neutral-450 font-mono">
                <LucideIcon name="Lock" className="h-3 tracking-widest w-3 text-neutral-500" />
                <span>Processamento criptografado de informações</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. SIMULATED PROFILE PROCESSING VIEW */}
        {/* ========================================================= */}
        {screen === 'analyzing' && (
          <div id="screen-analyzing" className="max-w-md mx-auto py-8 text-center animate-fade-in mt-6">
            <div className="bg-[#0b0c0c] border border-neutral-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              
              {/* Spinning Radiant Loader */}
              <div className="relative h-20 w-20 mx-auto mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-neutral-900"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-transparent animate-spin"></div>
                <span className="text-sm font-black text-rose-500 font-mono">{checkingProgress}%</span>
              </div>

              <h2 className="text-lg font-black tracking-wider uppercase text-white mb-2">
                Qualificando Seu Perfil...
              </h2>
              <p className="text-xs text-neutral-400 mb-8 max-w-xs mx-auto">
                Aguarde alguns segundos enquanto computamos suas respostas de viabilidade com as disponibilidades de cotas reguladas pelo Banco Central.
              </p>

              {/* Live Checks List */}
              <div className="space-y-3.5 text-left border-t border-neutral-905 pt-6">
                {checksList.map((chk, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {chk.status === 'success' && (
                      <div className="h-5 w-5 rounded-full bg-red-950/40 text-red-500 flex items-center justify-center border border-red-900/60 flex-shrink-0 animate-scale-up">
                        <LucideIcon name="Check" className="h-3 w-3 stroke-[3px]" />
                      </div>
                    )}
                    {chk.status === 'loading' && (
                      <div className="h-5 w-5 rounded-full border-2 border-red-600 border-t-transparent animate-spin flex-shrink-0"></div>
                    )}
                    {chk.status === 'pending' && (
                      <div className="h-5 w-5 rounded-full border-2 border-neutral-800 bg-neutral-900 flex-shrink-0"></div>
                    )}
                    <span className={`text-[11px] font-mono leading-tight ${
                      chk.status === 'success' ? 'text-neutral-300 font-semibold' : 'text-neutral-500'
                    }`}>
                      {chk.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. RESULT & CONVERSION CTA VIEW */}
        {/* ========================================================= */}
        {screen === 'result' && (
          <div id="screen-result" className="flex flex-col gap-10 mt-2 animate-fade-in">
            
            {/* Header Result Badge Banner */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-red-950/25 border-2 border-red-600 px-4 py-1.5 rounded-full text-red-500 animate-bounce">
                <LucideIcon name="CheckCircle" className="h-4 w-4 fill-red-950" />
                <span className="text-xs font-black tracking-widest uppercase font-sans">
                  Apto(a) para Ingressar!
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white hover:text-neutral-100 uppercase leading-none tracking-tight">
                COMPATIBILIDADE DE PERFIL DE {scoreVal}% CONFIRMADA!
              </h1>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Parabéns! Suas respostas alinham-se perfeitamente com os critérios e cotas com lances embutidos selecionadas.
              </p>
            </div>

            {/* Generated Profile Diagnosis Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Detailed Personal Report & Timer */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Visual Custom Diagnosis Report */}
                <div className="bg-[#0b0c0c] border border-neutral-800 p-6 sm:p-7 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 py-1.5 px-4 bg-red-600/10 border-b border-l border-red-900 px-4 rounded-bl-xl text-[9px] font-bold text-red-500 font-mono uppercase tracking-widest">
                    Laudo Dinâmico
                  </div>
                  
                  <h3 className="text-sm font-black text-neutral-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <LucideIcon name="Activity" className="h-4 w-4 text-red-600" />
                    Diagnóstico Estrutural
                  </h3>

                  <div className="space-y-4 font-sans leading-relaxed text-xs text-neutral-300">
                    <p>
                      Analisando suas respostas de enquadramento, identificamos que o seu perfil para o faturamento de{' '}
                      <strong className="text-white uppercase px-1 rounded bg-red-950/40 border border-red-900/30">
                        "{answers['sonho'] || 'Seu Objetivo'}"
                      </strong>{' '}
                      no valor estimado de <strong>{answers['renda_meta'] || 'Sob Planejamento'}</strong> com parcelas na faixa de{' '}
                      <strong className="text-white bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded font-mono text-red-400">
                        {answers['parcela'] || 'Sob medida'}
                      </strong>{' '}
                      apresenta excelente segurança e alta saúde de enquadramento.
                    </p>
                    <p>
                      Com base na sua urgência de faturamento (<strong>{answers['urgencia'] || 'Prazo planejado'}</strong>) e fator potencializador (<strong>{answers['situacao'] || 'Início regular'}</strong>), o sistema estimou que a melhor rota estratégica recomendada é: <span className="text-red-500 font-bold underline decoration-red-800 decoration-2">{diagnosisDetails.estrategia}</span>.
                    </p>
                    
                    <div className="space-y-2 pt-1">
                      <p className="text-neutral-300 font-bold uppercase tracking-wider text-[10px] font-mono">
                        PROJEÇÕES OPERACIONAIS CALCULADAS:
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[10.5px]">
                        <div className="bg-neutral-950 p-2.5 border border-neutral-900 rounded-xl">
                          <span className="text-neutral-500 uppercase block text-[9px]">Cronograma de contemplação:</span>
                          <span className="text-white font-bold">{diagnosisDetails.prazo}</span>
                        </div>
                        <div className="bg-neutral-950 p-2.5 border border-neutral-900 rounded-xl">
                          <span className="text-neutral-500 uppercase block text-[9px]">Redução de taxas (Economia):</span>
                          <span className="text-emerald-500 font-bold">{diagnosisDetails.economia}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-neutral-400 bg-neutral-950 p-3.5 rounded-xl border border-neutral-900 font-sans text-xs space-y-1 mt-3">
                      <strong className="text-red-500 font-bold uppercase font-mono block text-[10px]">Destaque do Especialista:</strong>
                      <p>{diagnosisDetails.destaque} {diagnosisDetails.detalhes}</p>
                    </div>
                  </div>

                  {/* High Scarcity Live Timer Box */}
                  <div className="mt-6 bg-red-950/20 border border-red-900/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.2 rounded-lg bg-red-600 text-white shadow-md shadow-red-600/20">
                        <LucideIcon name="Timer" className="h-4 w-4" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider leading-none">
                          Análise Reservada Prioritária por:
                        </p>
                        <p className="text-xs text-red-400 font-semibold font-sans mt-1">
                          Consulte os planos antes que expire.
                        </p>
                      </div>
                    </div>
                    {/* Live Clock countdown formatted mm:ss */}
                    <div className="text-2xl font-black text-white bg-black border border-neutral-800 px-4 py-1.5 rounded-lg tracking-widest font-mono text-center min-w-[100px]">
                      {countdown > 0 ? formatCountdownTime(countdown) : 'EXPIRADO'}
                    </div>
                  </div>
                </div>

                {/* FAQ section to bolster reassurance */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">
                    Central de Dúvidas sobre o Relatório
                  </h4>
                  <FaqSection items={FAQ_ITEMS.slice(0, 2)} />
                </div>
              </div>

              {/* High-Converting CTA Pitch Card & Dynamic Real comments feed */}
              <div className="md:col-span-12 lg:col-span-5 space-y-6">
                
                {/* Instant Action CTA Card */}
                <div className="bg-[#121212]/30 border border-neutral-800 p-6 rounded-2xl relative shadow-2xl overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 inset-x-0 h-1 bg-red-600"></div>
                  
                  <div className="text-center space-y-4 col-span-1">
                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest font-mono">
                      ● ATIVAÇÃO DE SIMULAÇÃO INDIVIDUAL
                    </p>
                    <div className="inline-flex gap-1 items-center bg-black py-0.5 px-3 rounded-full border border-neutral-800 text-[10px] font-mono text-neutral-400">
                      Vagas para suporte hoje: <span className="text-red-500 font-bold">{spotsLeft} vagas</span>
                    </div>
                    
                    <h3 className="text-lg font-black tracking-tight text-white leading-tight uppercase font-sans">
                      Acessar Planejamento de Crédito!
                    </h3>
                    <p className="text-xs text-neutral-350 leading-relaxed font-sans mt-2">
                      O resumo das suas parcelas inteligentes e estratégias de abatimento de juros foi gerado. Para sua comodidade e segurança de faturamento, clique no botão para incluir seus dados. Nosso consultor credenciado disponibilizará sua planilha de simulações oficiais imediatamente.
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => setScreen('capture')}
                        className="w-full p-4.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold tracking-widest text-xs uppercase shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 select-none hover:scale-102 active:scale-98 cursor-pointer animate-pulse font-black"
                      >
                        <LucideIcon name="CheckCircle" className="h-4.5 w-4.5" />
                        <span>VER MEU PLANEJAMENTO DE CRÉDITO →</span>
                      </button>
                      <p className="text-[9px] text-neutral-400 font-mono mt-2.5 flex items-center justify-center gap-1.5 leading-none">
                        <LucideIcon name="Lock" className="h-3 w-3 text-emerald-500" />
                        Acesso exclusivo à nossa tabela personalizada
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini trust checklist banner content */}
                <div className="bg-neutral-950/40 border border-neutral-900 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>Assessoria credenciada e regulada sob normas federais do BACEN</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>Tabelas de parcelas personalizadas com taxas administradas justas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>Uso estratégico das suas reservas imateriais e FGTS</span>
                  </div>
                </div>

              </div>
            </div>

            {/* In-depth reviews under final pitch */}
            <div className="border border-neutral-800 p-6 sm:p-8 rounded-2xl bg-neutral-950/20 mt-4 shadow-xl">
              <div className="text-center max-w-sm mx-auto mb-6">
                <h3 className="text-lg font-black tracking-wide text-white uppercase">
                  Compartilhe suas Conquistas
                </h3>
                <p className="text-xs text-neutral-400">
                  Deixe seu feedback para que possamos continuar aprovando novos candidatos dedicados.
                </p>
              </div>
              <SocialFeedback />
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* 4A. PORTUGUESE HIGH-CONVERTING CONTACT CAPTURE SCREEN */}
        {/* ========================================================= */}
        {screen === 'capture' && (
          <div id="screen-capture" className="max-w-md mx-auto py-6 mt-6 animate-fade-in">
            <div className="bg-[#0b0c0c] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-red-600"></div>

              {/* Progress visual cue */}
              <div className="flex items-center justify-between mb-6 border-b border-neutral-900 pb-4">
                <span className="text-[10px] bg-red-950/40 border border-red-900/60 px-2.5 py-1 rounded text-red-500 font-mono uppercase font-black tracking-widest">
                  Laudo Disponível ✔
                </span>
                <span className="text-xs font-mono text-neutral-400">Passo Final de Liberação</span>
              </div>

              <div className="text-center space-y-3 mb-6">
                <h2 className="text-lg sm:text-xl font-black text-white hover:text-neutral-100 uppercase tracking-tight font-sans">
                  QUASE LÁ! LIBERE SUA TABELA DE PARCELAS
                </h2>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Insira o seu nome de contato e WhatsApp onde o consultor Ademicon enviará formalmente o documento com as <strong>simulações de parcelas reduzidas</strong> oficiais adequadas para o seu orçamento.
                </p>
              </div>

              <form onSubmit={handleCaptureSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="capture-nome" className="text-[10px] text-neutral-450 font-mono uppercase font-bold tracking-wider">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <LucideIcon name="MessageSquare" className="h-4 w-4" />
                    </div>
                    <input
                      id="capture-nome"
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 font-sans">
                  <label htmlFor="capture-tel" className="text-[10px] text-neutral-450 font-mono uppercase font-bold tracking-wider">
                    Número de WhatsApp (Com DDD) *
                  </label>
                  <div className="relative col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <LucideIcon name="Smartphone" className="h-4 w-4" />
                    </div>
                    <input
                      id="capture-tel"
                      type="tel"
                      required
                      placeholder="Ex: (11) 99999-9999"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 font-sans pb-2">
                  <label htmlFor="capture-cidade" className="text-[10px] text-neutral-450 font-mono uppercase font-bold tracking-wider">
                    Cidade / UF (Opcional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                      <LucideIcon name="Home" className="h-4 w-4" />
                    </div>
                    <input
                      id="capture-cidade"
                      type="text"
                      placeholder="Ex: São Paulo - SP"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-4 rounded-xl font-bold tracking-widest text-xs uppercase shadow-lg transition-all flex items-center justify-center gap-2 select-none border border-red-500/10 cursor-pointer ${
                      isSubmitting
                        ? 'bg-neutral-850 text-neutral-550'
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                    }`}
                  >
                    <span>{isSubmitting ? 'AGUARDE...' : 'RECEBER MEU PLANEJAMENTO GRATUITO ✔'}</span>
                    <LucideIcon name="ArrowRight" className="h-4 w-4" />
                  </button>
                  <p className="text-[9px] text-center text-neutral-400 font-mono mt-3 leading-relaxed">
                    ✓ Ao clicar, você será enviado a uma nova aba do WhatsApp com seu resumo simulado estruturado para atendimento individual completo Ademicon.
                  </p>
                </div>
              </form>

              <div className="border-t border-neutral-900 pt-5 mt-6 flex items-center gap-1.5 justify-center text-[10.5px] text-neutral-500 font-mono">
                <LucideIcon name="Lock" className="h-3 w-3 text-emerald-500" />
                <span>Processo 100% criptografado e seguro</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Floating real-time conversion notifier standard */}
      <NotificationToast />

      {/* Admin Panel Toggle completely disabled as requested to hide control gear */}

      {/* Footer copyright */}
      <footer id="footer-details" className="border-t border-neutral-900 py-10 text-center text-neutral-500 text-[10px] tracking-wide max-w-5xl mx-auto w-full px-4 relative mt-auto">
        <div className="max-w-md mx-auto space-y-4">
          <p>© 2026 {settings.nicheTitle}. Todos os direitos reservados.</p>
          <p className="leading-relaxed font-sans">
            Aviso Legal: Os resultados das simulações baseiam-se em planejamento de alavancagem de longo prazo. O ecossistema operacional de crédito parceiro é devidamente regulado e fiscalizado sob normas oficiais do Banco Central do Brasil.
          </p>
          <div className="flex items-center justify-center gap-4 text-neutral-450 uppercase tracking-widest font-mono text-[9px]">
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Políticas de Privacidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
