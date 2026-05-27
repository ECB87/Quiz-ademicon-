import { QuizStep, Testimonial, FaqItem, FunnelSettings } from './types';

// MELHORIA: Configurações padrão com tom profissional e transparente, incluindo URL de webhook para CRM
export const DEFAULT_SETTINGS: FunnelSettings = {
  nicheTitle: 'Planejamento de Conquistas Patrimoniais',
  landingHeadline: 'VOCÊ NÃO PRECISA PAGAR O DOBRO EM JUROS PARA REALIZAR OS SEUS SONHOS: DESCUBRA COMO CONQUISTAR SEU IMÓVEL OU VEÍCULO COM PARCELAS AMIGÁVEIS E ECONOMIA REAL!',
  landingSubHeadline: 'Leve apenas 60 segundos para planejar sua rota inteligente de aquisição. Nossa simulação analisa suas condições para sugerir um caminho de crédito limpo e sob medida, totalmente livre das taxas pesadas dos financiamentos tradicionais.',
  ctaText: 'SIMULAR AGORA — Consultor Disponível ✔',
  ctaUrl: 'https://wa.me/5511985075761?text=Olá!%20Realizei%20o%20Mapeamento%20de%20Planejamento%20Financeiro.%20Gostaria%20de%20receber%20minhas%20opções%20personalizadas.',
  cooldownMinutes: 10,
  spotsCount: 5,
  scarcityMessage: 'CONVITE EXCLUSIVO: Análise de perfil 100% gratuita para simulação de tabelas especiais de longo prazo com taxa de juro zero.',
  webhookUrl: 'https://seu-crm.com/webhook/lead'
};

// MELHORIA: Quiz reordenado, com IDs corrigidos, passo a passo mais natural e títulos específicos para o progresso do lead
export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'sonho',
    stepTitle: 'Seu Objetivo',
    type: 'cards',
    question: 'Qual é o seu maior objetivo patrimonial ou sonho para realizar hoje?',
    subQuestion: 'Selecione o bem ou investimento principal que guiará a sua rota de planejamento personalizada.',
    options: [
      { id: 'sonho_1', label: 'Minha Casa Própria, Terreno ou Construção', value: 'Minha Casa Própria / Terreno', iconName: 'Home', description: 'Destravar as chaves do meu imóvel perfeito sem pagar o preço de 3 para o banco' },
      { id: 'sonho_2', label: 'Carro Zero ou Veículo Premium', value: 'Carro Novo / Veículo Premium', iconName: 'Car', description: 'Renovar a garagem de forma planejada, livre de juros rotativos de financiadoras' },
      { id: 'sonho_3', label: 'Aposentadoria de Elite / Renda Passiva', value: 'Aposentadoria de Elite / Investimentos', iconName: 'TrendingUp', description: 'Construir tranquilidade patrimonial e multiplicar meus investimentos de forma blindada' },
      { id: 'sonho_4', label: 'Projetos Pessoais / Expansão / Equipamentos', value: 'Expansão de Negócios / Serviços', iconName: 'Cpu', description: 'Obter grande escala comercial ou realizar objetivos pessoais e viagens sem perder caixa' },
      { id: 'sonho_5', label: 'Derrubar Dívidas e Financiamentos Ativos', value: 'Trocar Dívida por Parcela Justa', iconName: 'Award', description: 'Liquidar as parcelas assustadoras do seu banco atual por uma proposta planejada' }
    ]
  },
  {
    id: 'urgencia',
    stepTitle: 'Cronograma',
    type: 'cards',
    question: 'Qual é o cronograma desejado para usufruir da sua conquista?',
    subQuestion: 'Defina a urgência para desenharmos os prazos e estratégias correspondentes ao seu perfil.',
    options: [
      { id: 'urg_1', label: 'Imediato / O Mais Rápido Possível (Aceleração por aporte)', value: 'Antecipação rápida com aporte', iconName: 'Flame', description: 'Possuo margem própria de lance ou entrada para antecipar a entrega das chaves ou veículo' },
      { id: 'urg_2', label: 'Prazo Planejado Estrategicamente pelo Método', value: 'Uso do mecanismo interno de resgate', iconName: 'TrendingUp', description: 'Gostaria de usar opções de lances embutidos para acelerar e adiantar o resgate' },
      { id: 'urg_3', label: 'Sem Pressa Automática (Construir patrimônio com parcelas limpas)', value: 'Construção sólida de médio a longo prazo', iconName: 'Cpu', description: 'Pretendo acumular patrimônio pagando a menor taxa de custo histórico do país' }
    ]
  },
  {
    id: 'renda_meta',
    stepTitle: 'Valor do Crédito',
    type: 'cards',
    question: 'De qual patamar de recurso você precisa para conquistar esse objetivo?',
    subQuestion: 'Selecione a faixa estimada de capital necessário. Nosso sistema buscará o enquadramento ideal.',
    options: [
      { id: 'renda_1', label: 'R$ 50 mil a R$ 150 mil', value: 'R$ 50.000 a R$ 150.000', iconName: 'DollarSign', description: 'Excelente para carros novos, reformas estratégicas ou capital de giro em projetos' },
      { id: 'renda_2', label: 'R$ 150 mil a R$ 350 mil', value: 'R$ 150.000 a R$ 350.000', iconName: 'Zap', description: 'Perfeito para terrenos bem localizados, apartamentos compactos ou utilitários' },
      { id: 'renda_3', label: 'R$ 350 mil a R$ 750 mil', value: 'R$ 350.000 a R$ 750.000', iconName: 'Sparkles', description: 'Casas de alto padrão familiar, galpões de alta operação ou frotas comerciais' },
      { id: 'renda_4', label: 'Acima de R$ 750 mil', value: 'Acima de R$ 750.000', iconName: 'Flame', description: 'Estratégias avançadas de alavancagem de investimentos ou imóveis de altíssimo luxo' }
    ]
  },
  {
    id: 'parcela',
    stepTitle: 'Orçamento Mensal',
    type: 'cards',
    question: 'Qual contribuição de parcela mensal se ajusta confortavelmente ao seu orçamento?',
    subQuestion: 'Nossa simulação prioriza o equilíbrio financeiro sem os juros das grandes instituições.',
    options: [
      { id: 'parc_1', label: 'De R$ 300 a R$ 800 por mês', value: 'R$ 300 a R$ 800 por mês', iconName: 'Clock', description: 'Planejamento leve para garantir as bases do seu próximo passo seguro' },
      { id: 'parc_2', label: 'De R$ 800 a R$ 1.800 por mês', value: 'R$ 800 a R$ 1.800 por mês', iconName: 'Smartphone', description: 'Custo-benefício excelente com ótima relação de parcelas e liquidez' },
      { id: 'parc_3', label: 'De R$ 1.800 a R$ 3.500 por mês', value: 'R$ 1.800 a R$ 3.500 por mês', iconName: 'Monitor', description: 'Contemplação estruturada projetada em menor espaço de tempo para bens urgentes' },
      { id: 'parc_4', label: 'Acima de R$ 3.500 por mês', value: 'Acima de R$ 3.500 por mês', iconName: 'Activity', description: 'Planos corporativos sofisticados de grande velocidade para empresários e líderes' }
    ]
  },
  {
    id: 'situacao',
    stepTitle: 'Potencializadores',
    type: 'cards',
    question: 'Selecione qual benefício ou potencializador você possui para acelerar seu plano:',
    subQuestion: 'Selecione com honestidade para que possamos traçar as melhores simulações adicionais.',
    options: [
      { id: 'sit_1', label: 'Uso de fundos parados ou reservas inativas (FGTS, etc)', value: 'FGTS / Reservas inativas utilizáveis', iconName: 'ShieldAlert', description: 'Desejo usar recursos adormecidos como força de atalho para encurtar os meses de espera' },
      { id: 'sit_2', label: 'Tenho bem de passeio ou utilitário usado para dar impulso', value: 'Bens usados para avaliação de resgate', iconName: 'Briefcase', description: 'Gostaria de avaliar a possibilidade de introduzir bens atuais para antecipação estratégica' },
      { id: 'sit_3', label: 'Quero usar o lance fixo integrado de até 30% do crédito', value: 'Lance fixo integrado de até 30% da linha', iconName: 'TrendingUp', description: 'Usar o próprio poder do método (até 30% do teto) para acelerar e adiantar a posse' },
      { id: 'sit_4', label: 'Começar apenas com o valor da parcela regular sem nenhuma entrada', value: 'Início sem entrada, apenas mensalidade', iconName: 'Play', description: 'Prefiro seguir pagando exclusivamente a parcela ajustada sem aportes externos' }
    ]
  }
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Fabiane Custódio Silva',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 5 minutos',
    rating: 5,
    verified: true,
    content: 'Eu achava que demoraria décadas para dar uma casa própria digna pra minha família... mas usei as alternativas de planejamento estratégico que o consultor me ensinou... Economizei mais de R$ 90 mil que eu daria de juros para o banco se fizesse um financiamento tradicional em 30 anos. Realizei meu sonho de forma segura e econômica!',
    likes: 54
  },
  {
    id: 't2',
    name: 'Henrique Vasconcelos',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 18 minutos',
    rating: 5,
    verified: true,
    content: 'O gerente do meu banco tradicional queria me cobrar quase outro carro só de juros abusivos... Fiz a simulação de planejamento patrimonial aqui e chamei o especialista. Ele elaborou um cronograma sem juros e em pouco tempo já retirei o carro, pagando uma mensalidade incrível e sem sofrer com as armadilhas comuns.',
    likes: 31
  },
  {
    id: 't3',
    name: 'Rodrigo Antunes de Souza',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 45 minutes',
    rating: 5,
    verified: true,
    content: 'Por ser profissional autônomo, os bancos comuns dificultavam muito por conta da comprovação tradicional. Esse diagnóstico inteligente mudou o jogo. Falei com o consultor credenciado, ele estruturou a rota e hoje o meu consultório próprio de alto padrão está inaugurado e funcionando. Transparência completa.',
    likes: 72
  },
  {
    id: 't4',
    name: 'Mariana Lima Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 2 horas',
    rating: 5,
    verified: true,
    content: 'Tinha um dinheiro parado rendendo quase nada no banco. O consultor montou um planejamento tão claro que compreendi onde estava perdendo dinheiro. Conquistei o imóvel com muita segurança e economia.',
    likes: 24
  }
];

// MELHORIA: FAQ reescrito, linguagem profissional e transparente. Sem referências a sistemas mágicos ou "secretos".
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como este planejamento inteligente economiza dinheiro em relação aos bancos tradicionais?',
    answer: 'Os bancos tradicionais cobram juros compostos que muitas vezes triplicam o valor original do bem ao longo de um financiamento de 30 anos. Através de grupos de consórcio regulados pelo Banco Central do Brasil, o crédito é viabilizado por uma taxa de administração fixa e extremamente baixa, diluída uniformemente nas parcelas. Isso elimina a incidência de juros bancários clássicos, gerando uma economia de até 60% no custo total.'
  },
  {
    question: 'Este modelo de planejamento é realmente seguro e regulamentado?',
    answer: 'Sim, absolutamente. Todas as operações sugeridas ocorrem sob as rígidas normas e a fiscalização ativa do Banco Central do Brasil (BACEN), de acordo com a Lei dos Consórcios. Isso garante total segurança jurídica, solidez e transparência a cada etapa do seu plano imobiliário ou automotivo.'
  },
  {
    question: 'Como funciona o lance fixo embutido integrado de até 30%?',
    answer: 'Trata-se de um facilitador financeiro legal e regulamentado. Você pode utilizar uma porcentagem de até 30% do valor do seu próprio crédito simulado para servir de lance. Caso seja contemplado, esse percentual é descontado no valor final liberado. Isso possibilita acelerar a contemplação substancialmente sem que você precise dispor de recursos próprios em dinheiro vivo.'
  },
  {
    question: 'A simulação é gratuita e qual o papel do especialista no WhatsApp?',
    answer: 'A simulação inicial de enquadramento de perfil é 100% gratuita. Ao final, após preencher seus dados, você pode acessar nossa planilha de simulação de parcelas e falar com um especialista via WhatsApp. Ele apresentará tabelas personalizadas de parcelas reduzidas e elaborará um roteiro financeiro realista baseado no seu orçamento pessoal.'
  }
];
