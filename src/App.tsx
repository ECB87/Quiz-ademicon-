import { useState, useEffect } from 'react';
import { QuizOption, QuizStep, FunnelSettings } from './types';
import { QUIZ_STEPS, DEFAULT_SETTINGS, FAQ_ITEMS } from './data';
import { LucideIcon } from './components/LucideIcon';
import { NotificationToast } from './components/NotificationToast';
import { FaqSection } from './components/FaqSection';
import { SocialFeedback } from './components/SocialFeedback';
import dreamHero from './assets/images/dream_hero_1779758741967.png';

export default function App() {
  // Screens state: 'landing' | 'quiz' | 'analyzing' | 'result'
  const [screen, setScreen] = useState<'landing' | 'quiz' | 'analyzing' | 'result'>('landing');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

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

  // Urgency State
  const [spotsLeft, setSpotsLeft] = useState(settings.spotsCount);
  const [countdown, setCountdown] = useState(settings.cooldownMinutes * 60);

  // Analyzing state loaders
  const [checkingProgress, setCheckingProgress] = useState(0);
  const [checksList, setChecksList] = useState([
    { text: 'Analisando dados do bem ou patrimônio desejado...', status: 'loading' },
    { text: 'Verificando limites de parcelas vs. orçamento do perfil...', status: 'pending' },
    { text: 'Mapeando canais de planejamento fechados com maiores taxas de liberação...', status: 'pending' },
    { text: 'Buscando bônus de alavancagem embutidos e lotes prioritários...', status: 'pending' }
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

  // Countdown clock ticker on final page
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
    setAnswers({});
    setCurrentStep(0);
    setCheckingProgress(0);
    setSelectedOptionId(null);
    setChecksList([
      { text: 'Analisando dados do bem ou patrimônio desejado...', status: 'loading' },
      { text: 'Verificando limites de parcelas vs. orçamento do perfil...', status: 'pending' },
      { text: 'Mapeando canais de planejamento fechados com maiores taxas de liberação...', status: 'pending' },
      { text: 'Buscando bônus de alavancagem embutidos e lotes prioritários...', status: 'pending' }
    ]);
    setScreen('quiz');
  };

  // Handle option select with visual advanced feedback delay
  const handleSelectOption = (stepId: string, option: QuizOption) => {
    setSelectedOptionId(option.id);
    setAnswers((prev) => ({ ...prev, [stepId]: option.value }));

    // Short tactile delay so the user feels the selection click and the red color glow active
    setTimeout(() => {
      setSelectedOptionId(null);
      if (currentStep < QUIZ_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
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

  // Dynamic user specific results generator
  const selectedDream = answers['sonho'] || 'Liberdade Financeira';
  const selectedTime = answers['tempo'] || '1 a 2 horas';
  const selectedTool = answers['ferramenta'] || 'Apenas celular';
  const selectedRenda = answers['renda_meta'] || 'R$ 5.000 a R$ 10.000';
  const selectedSituacao = answers['situacao'] || 'Sair do sufoco urgente';

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
                    Estratégia Altamente Lucrativa 2026
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
                    onClick={startQuiz}
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
              <span className="text-xs font-mono text-neutral-400">
                Questão {currentStep + 1} de {QUIZ_STEPS.length}
              </span>
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
                            <p className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate pr-1">
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
              <div className="border-t border-neutral-900/90 pt-5 mt-6 flex items-center gap-1.5 justify-center text-[10px] text-neutral-400 font-mono">
                <LucideIcon name="Lock" className="h-3 tracking-widest w-3 text-neutral-500" />
                <span>Processamento criptografado de dados</span>
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
                Aguarde alguns segundos enquanto computamos suas respostas de viabilidade com as disponibilidades de lotes de liberação secreta.
              </p>

              {/* Live Checks List */}
              <div className="space-y-3.5 text-left border-t border-neutral-900 pt-6">
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
                    <span className={`text-[11px] font-mono leading-none ${
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
                COMPATIBILIDADE DE PERFIL DE 98.4% CONFIRMADA!
              </h1>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Parabéns! Suas metas alinham-se perfeitamente com as diretrizes e lotes prioritários selecionados.
              </p>
            </div>

            {/* Generated Profile Diagnosis Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Detailed Personal Report & Timer */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Visual Custom Diagnosis Report */}
                <div className="bg-[#0b0c0c] border border-neutral-800 p-6 sm:p-7 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 py-1.5 px-4 bg-red-600/10 border-b border-l border-red-900 px-4 rounded-bl-xl text-[9px] font-bold text-red-500 font-mono uppercase tracking-widest">
                    Relatório Individual
                  </div>
                  
                  <h3 className="text-sm font-black text-neutral-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <LucideIcon name="Activity" className="h-4 w-4 text-red-600" />
                    Diagnóstico Estrutural
                  </h3>

                  <div className="space-y-4 font-sans leading-relaxed text-xs text-neutral-300">
                    <p>
                      Analisando os seus dados fornecidos, identificamos que o seu perfil de planejamento com um orçamento mensal na faixa de{' '}
                      <strong className="text-white bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded font-mono text-red-400">
                        {selectedTime}
                      </strong>{' '}
                      para atingir o objetivo de{' '}
                      <strong className="text-white uppercase px-1 rounded bg-red-950/40 border border-red-900/30">
                        "{selectedDream}"
                      </strong>{' '}
                      de valor estimado em{' '}
                      <strong>{selectedRenda}</strong> possui viabilidade financeira excelente.
                    </p>
                    <p>
                      Com base no seu perfil de urgência (<strong>{selectedTool}</strong>) e recurso facilitador selecionado (<strong>{selectedSituacao}</strong>), nossa ferramenta automática indica que a melhor estratégia é a de{' '}
                      <span className="text-red-500 font-bold underline decoration-red-800 decoration-2">
                        Contemplação Estratégica
                      </span>
                      . Isso permite customizar planos de lance embutido específicos para o seu orçamento ou requerer o uso inteligente do seu saldo de FGTS para acelerar a liberação e entrega das chaves ou do veículo.
                    </p>
                    <p className="text-neutral-400 bg-[#121212] p-3 rounded-lg border border-neutral-900 font-mono text-[11px]">
                      <strong>PROPOSTA DE COMPATIBILIDADE:</strong> A sua vaga reserva garante condições promocionais de taxa reduzida por tempo limitado. Clique no botão de WhatsApp abaixo para falar com o Consultor Financeiro a fim de receber a tabela de simulações oficiais no seu número.
                    </p>
                  </div>

                  {/* High Scarcity Live Timer Box */}
                  <div className="mt-6 bg-red-950/20 border border-red-900/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.2 rounded-lg bg-red-600 text-white shadow-md shadow-red-600/20">
                        <LucideIcon name="Timer" className="h-4 w-4" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider leading-none">
                          Inscrição Reservada com Desconto por:
                        </p>
                        <p className="text-xs text-red-400 font-semibold font-sans mt-1">
                          Garanta seu acesso antes que as vagas encerrem.
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
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#999] ml-1">
                    Suporte & Central de Ajuda do Diagnóstico
                  </h4>
                  <FaqSection items={FAQ_ITEMS.slice(0, 2)} />
                </div>
              </div>

              {/* High-Converting CTA Pitch Card & Dynamic Real comments feed */}
              <div className="md:col-span-5 space-y-6">
                
                {/* Instant Action CTA Card */}
                <div className="bg-[#121212]/30 border border-neutral-800 p-6 rounded-2xl relative shadow-2xl overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 inset-x-0 h-1 bg-red-600"></div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest font-mono">
                      ● VAGA RESERVADA GARANTIDA
                    </p>
                    <div className="inline-flex gap-1 items-center bg-black py-0.5 px-3 rounded-full border border-neutral-800 text-[10px] font-mono text-neutral-400">
                      Restam apenas: <span className="text-red-500 font-bold">{spotsLeft} vagas</span> na sua região
                    </div>
                    
                    <h3 className="text-lg font-black tracking-tight text-white leading-tight uppercase font-sans">
                      VER MEU PLANEJAMENTO DE CRÉDITO!
                    </h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed font-sans mt-2">
                      A sua estimativa de parcelas e caminhos de economia foi gerada com sucesso! Para sua segurança e comodidade, clique no botão abaixo para enviar o resumo diretamente ao nosso especialista via WhatsApp. Ele vai liberar o seu acesso gratuito à planilha de simulações, apresentar as melhores parcelas reduzidas e tirar todas as suas dúvidas na hora.
                    </p>

                    <div className="pt-2">
                      <a
                        href={countdown > 0 ? settings.ctaUrl : '#'}
                        target={countdown > 0 ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className={`w-full p-4 rounded-xl font-bold tracking-wider text-xs uppercase shadow-lg transition-all flex items-center justify-center gap-2 select-none hover:scale-102 active:scale-98 ${
                          countdown > 0
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 font-black cursor-pointer animate-pulse'
                            : 'bg-neutral-800 text-neutral-500 shadow-none hover:bg-neutral-800 cursor-not-allowed'
                        }`}
                      >
                        <LucideIcon name="CheckCircle" className="h-4 w-4" />
                        <span>{countdown > 0 ? settings.ctaText : 'Oportunidade Esgotada'}</span>
                      </a>
                      <p className="text-[9px] text-neutral-400 font-mono mt-2 flex items-center justify-center gap-1.5 leading-none">
                        <LucideIcon name="Lock" className="h-3 w-3 text-emerald-500" />
                        Atendimento 100% individual e seguro
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini trust checklist banner content */}
                <div className="bg-neutral-950/40 border border-neutral-900 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>Assessoria credenciada e regulada sob normas do Banco Central</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>Tabelas de parcelas reduzidas exclusivas do semestre</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>Uso estratégico do seu FGTS desburocratizado</span>
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
          <div className="flex items-center justify-center gap-4 text-neutral-400 uppercase tracking-widest font-mono">
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Políticas de Privacidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
