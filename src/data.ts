import { QuizStep, Testimonial, FaqItem, FunnelSettings } from './types';

export const DEFAULT_SETTINGS: FunnelSettings = {
  nicheTitle: 'Consultoria Financeira Ademicon',
  landingHeadline: 'COMO CONQUISTAR SEU IMÓVEL, CARRO OU INVESTIMENTO LIVRE DOS JUROS ABUSIVOS DOS BANCOS',
  landingSubHeadline: 'Um simulador inteligente de 60 segundos que analisa sua capacidade, calcula parcelas ideais e gera uma rota de contemplação acelerada através do Consórcio Ademicon.',
  ctaText: 'SIMULAR PLANO DE CONQUISTAS COORDENADO',
  ctaUrl: 'https://wa.me/5500000000000?text=Olá!%20Acabei%20de%20completar%20o%20Simulador%20Ademicon.%20Gostaria%20de%20ver%20as%20cartas%20de%20crédito%20disponíveis%20para%20o%20meu%20perfil!',
  cooldownMinutes: 10,
  spotsCount: 5,
  scarcityMessage: 'PROMOÇÃO EXCLUSIVA: Grupos com taxa de administração reduzida e lances embutidos ativos por tempo limitado!'
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'sonho',
    type: 'cards',
    question: 'Qual é o seu maior objetivo patrimonial ou sonho para realizar hoje?',
    subQuestion: 'Selecione o bem ou investimento principal que guiará a sua simulação personalizada.',
    options: [
      { id: 'sonho_1', label: 'Imóvel / Casa Própria', value: 'Imóvel / Casa Própria', iconName: 'Home', description: 'Casa, apartamento, terreno ou construção planejada' },
      { id: 'sonho_2', label: 'Carro Novo ou Premium', value: 'Carro Novo ou Premium', iconName: 'Car', description: 'Conquistar ou trocar o veículo sem juros abusivos de financiamento' },
      { id: 'sonho_3', label: 'Aposentadoria / Investimento', value: 'Aposentadoria / Investimento', iconName: 'TrendingUp', description: 'Multiplicar patrimônio e construir renda passiva inteligente' },
      { id: 'sonho_4', label: 'Renovação de Frota / Serviços', value: 'Renovação de Frota / Serviços', iconName: 'Cpu', description: 'Implementar melhorias em cirurgias, viagens ou maquinário comercial' },
      { id: 'sonho_5', label: 'Quitar Financiamento', value: 'Quitar Financiamento', iconName: 'Award', description: 'Trocar a dívida alta do seu banco por parcelas fixas justas' }
    ]
  },
  {
    id: 'renda_meta',
    type: 'cards',
    question: 'Qual o valor aproximado do crédito (carta) que você precisa para o seu bem?',
    subQuestion: 'Escolha uma faixa de crédito para calcular as simulações promocionais do consórcio.',
    options: [
      { id: 'renda_1', label: 'R$ 50 mil a R$ 150 mil', value: 'R$ 50.000 a R$ 150.000', iconName: 'DollarSign', description: 'Excelente para carros novos, reformas expressas ou motos premium' },
      { id: 'renda_2', label: 'R$ 150 mil a R$ 350 mil', value: 'R$ 150.000 a R$ 350.000', iconName: 'Zap', description: 'Ideal para terrenos, apartamentos na planta ou utilitários' },
      { id: 'renda_3', label: 'R$ 350 mil a R$ 750 mil', value: 'R$ 350.000 a R$ 750.000', iconName: 'Sparkles', description: 'Compra de casas de alto padrão, galpões comerciais ou frotas' },
      { id: 'renda_4', label: 'Acima de R$ 750 mil', value: 'Acima de R$ 750.000', iconName: 'Flame', description: 'Alavancagem imobiliária e segurança patrimonial premium' }
    ]
  },
  {
    id: 'tempo',
    type: 'cards',
    question: 'Qual parcela mensal média se encaixa perfeitamente no seu bolso?',
    subQuestion: 'Lembre-se que consórcios têm parcelas sem juros, sendo muito mais baratas que financiamentos bancários.',
    options: [
      { id: 'tempo_1', label: 'R$ 300 a R$ 800 / mês', value: 'R$ 300 a R$ 800 por mês', iconName: 'Clock', description: 'Planejamento leve de longo prazo, perfeito para iniciar sua poupança' },
      { id: 'tempo_2', label: 'R$ 800 a R$ 1.800 / mês', value: 'R$ 800 a R$ 1.800 por mês', iconName: 'Smartphone', description: 'Ótimo custo-benefício com excelentes chances de lance embutido' },
      { id: 'tempo_3', label: 'R$ 1.800 a R$ 3.500 / mês', value: 'R$ 1.800 a R$ 3.500 por mês', iconName: 'Monitor', description: 'Foco em contemplação rápida e projetos de médio prazo' },
      { id: 'tempo_4', label: 'Acima de R$ 3.500 / mês', value: 'Acima de R$ 3.500 por mês', iconName: 'Activity', description: 'Alta velocidade de crédito e planos empresariais customizados' }
    ]
  },
  {
    id: 'ferramenta',
    type: 'cards',
    question: 'Qual o seu prazo ideal para conseguir retirar e usar o seu bem?',
    subQuestion: 'Escolha a opção que condiz com o seu cronograma pessoal de aquisição.',
    options: [
      { id: 'ferr_1', label: 'Quero contemplar rápido (Lance)', value: 'Contemplar rápido com lance', iconName: 'Flame', description: 'Tenho uma quantia separada para ofertar lances competitivos' },
      { id: 'ferr_2', label: 'Médio prazo planejado', value: 'Médio prazo planejado', iconName: 'TrendingUp', description: 'Pretendo usar o lance embutido ou lances graduais' },
      { id: 'ferr_3', label: 'Sem pressa (Sorteio/Parcela Baixa)', value: 'Poupar sem pressa em parcelas baixas', iconName: 'Cpu', description: 'Quero economizar guardando mensalmente pagando a menor taxa do mercado' }
    ]
  },
  {
    id: 'situacao',
    type: 'cards',
    question: 'Qual frase melhor descreve seu diferencial ou recurso facilitador?',
    subQuestion: 'Isso ajuda o consultor a preparar uma oferta específica e exclusiva.',
    options: [
      { id: 'sit_1', label: 'Possuo FGTS para deduzir', value: 'Possuo FGTS ativo', iconName: 'ShieldAlert', description: 'Quero usar meu FGTS para dar lance ou abater parcelas do consórcio' },
      { id: 'sit_2', label: 'Tenho veículo ou imóvel usado', value: 'Tenho veículo/imóvel para avaliação', iconName: 'Briefcase', description: 'Gostaria de usá-lo como potencializador na negociação' },
      { id: 'sit_3', label: 'Gostaria de usar Lance Embutido', value: 'Quero utilizar Lance Embutido', iconName: 'TrendingUp', description: 'Usar parte da própria carta de crédito (até 30%) para dar o lance' },
      { id: 'sit_4', label: 'Começar apenas com a parcela limpa', value: 'Apenas parcela, sem lance inicial', iconName: 'Play', description: 'Sem recursos extras para entrada hoje, quero crescer pelo sorteio' }
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
    content: 'Fiz a simulação com o consultor aqui e fomos direto no plano de imóvel. Eu achava que consórcio demorava demais, mas com a assessoria sobre lance embutido fui contemplada no terceiro mês! Economizei mais de R$ 90 mil que eu daria de juros se tivesse feito financiamento no banco tradicional. Recomendo muito esse simulador!',
    likes: 54
  },
  {
    id: 't2',
    name: 'Henrique Vasconcelos',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 18 minutos',
    rating: 5,
    verified: true,
    content: 'Excelente atendimento. Eu estava de olho num Jeep Compass, o gerente do banco queria me cobrar parcelas gigantescas com taxas absurdas. Fiz a simulação aqui, o consultor Ademicon montou uma carta de crédito de R$ 180 mil perfeita pro meu bolso. Ofertei o lance sugerido por ele e já estou com a máquina na garagem!',
    likes: 31
  },
  {
    id: 't3',
    name: 'Rodrigo Antunes de Souza',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 45 minutos',
    rating: 5,
    verified: true,
    content: 'Trabalho de forma autônoma e meu crédito para financiamento sempre dava enrosco no banco. Através da Ademicon e desse quiz, o consultor montou uma estratégia de comprovação descomplicada e hoje já tenho meu consultório próprio construído. Ferramenta fantástica e atendimento nota mil.',
    likes: 72
  },
  {
    id: 't4',
    name: 'Mariana Lima Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 2 horas',
    rating: 5,
    verified: true,
    content: 'Utilizei meu saldo do FGTS para o lance do consórcio imobiliário conforme a orientação detalhada que me mandaram após a simulação. Deu tudo super certo, processo muito seguro conduzido por profissionais qualificados. Vale muito a pena simular!',
    likes: 24
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Por que escolher a Ademicon Consórcios?',
    answer: 'A Ademicon é a maior administradora independente de consórcios do Brasil, com mais de 30 anos de mercado, regulada pelo Banco Central. Oferece as melhores taxas do setor, flexibilidade de parcelas, lance embutido e grupos extremamente saudáveis que garantem alta velocidade de contemplação.'
  },
  {
    question: 'O consórcio realmente vale mais a pena que o financiamento?',
    answer: 'Sim. No financiamento você chega a pagar até 3 vezes o valor do bem por causa dos juros compostos cobrados pelos bancos. No consórcio Ademicon não existem juros moratórios, apenas uma taxa de administração diluída fixamente nas parcelas, o que reduz o custo final em até 60% comparado a bancos tradicionais.'
  },
  {
    question: 'Como funciona o Lance Embutido no simulador?',
    answer: 'O lance embutido é uma facilidade fantástica onde você pode usar até 30% do valor da sua própria carta de crédito contratada para compor a sua oferta de lance de contemplação. Ou seja, você acelera seu bem mesmo sem ter todo o recurso guardado em dinheiro hoje!'
  },
  {
    question: 'O diagnóstico de perfil é gratuito?',
    answer: 'Sim, o preenchimento das informações e o direcionamento estratégico inicial do simulador inteligente são 100% gratuitos. Ao clicar no botão do resultado, você falará diretamente com o WhatsApp do consultor de finanças para receber a tabela oficial de taxas.'
  }
];
