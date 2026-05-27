import { QuizStep, Testimonial, FaqItem, FunnelSettings } from './types';

export const DEFAULT_SETTINGS: FunnelSettings = {
  nicheTitle: 'Planejamento de Conquistas Patrimoniais',
  landingHeadline: 'VOCÊ NÃO PRECISA PAGAR O DOBRO EM JUROS PARA REALIZAR OS SEUS SONHOS: DESCUBRA COMO CONQUISTAR SEU IMÓVEL OU VEÍCULO COM PARCELAS AMIGÁVEIS E ECONOMIA REAL!',
  landingSubHeadline: 'Leve apenas 60 segundos para planejar sua rota inteligente de aquisição. Nossa simulação analisa suas condições para sugerir um caminho de crédito limpo e sob medida, totalmente livre das taxas pesadas dos financiamentos tradicionais.',
  ctaText: 'DESBLOQUEAR MINHA SIMULAÇÃO NO WHATSAPP',
  ctaUrl: 'https://wa.me/5500000000000?text=Olá!%20Acabei%2520de%2520completar%2520o%2520planejamento%2520de%2520alavancagem.%2520Quero%2520receber%2520as%2520minhas%2520opções%2520de%2520parcelas%2520reduzidas%2520sem%2520juros%2520e%2520o%2520cronograma%2520de%2520conquista%2520para%2520o%2520meu%2520perfil!',
  cooldownMinutes: 10,
  spotsCount: 5,
  scarcityMessage: 'CONVITE EXCLUSIVO: Análise de perfil 100% gratuita para simulação de tabelas especiais de longo prazo com taxa de juro zero.'
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'sonho',
    type: 'cards',
    question: 'Qual é o seu maior objetivo patrimonial ou sonho para realizar hoje?',
    subQuestion: 'Selecione o bem ou investimento principal que guiará a sua rota de resgate personalizada.',
    options: [
      { id: 'sonho_1', label: 'Minha Casa Própria, Terreno ou Construção', value: 'Minha Casa Própria / Terreno', iconName: 'Home', description: 'Destravar as chaves do meu imóvel perfeito sem pagar o preço de 3 para o banco' },
      { id: 'sonho_2', label: 'Carro Zero ou Veículo Premium', value: 'Carro Novo / Veículo Premium', iconName: 'Car', description: 'Renovar a garagem em tempo recorde livre de juros rotativos de financiadoras' },
      { id: 'sonho_3', label: 'Aposentadoria de Elite / Renda Passiva', value: 'Aposentadoria de Elite / Investimentos', iconName: 'TrendingUp', description: 'Construir tranquilidade patrimonial e multiplicar meus investimentos de forma blindada' },
      { id: 'sonho_4', label: 'Projetos Pessoais / Expansão / Equipamentos', value: 'Expansão de Negócios / Serviços', iconName: 'Cpu', description: 'Obter grande escala comercial ou realizar cirurgias e viagens dos sonhos sem perder caixa' },
      { id: 'sonho_5', label: 'Derrubar Dívidas e Financiamentos Ativos', value: 'Trocar Dívida por Parcela Justa', iconName: 'Award', description: 'Liquidar as parcelas assustadoras do seu banco atual por uma proposta limpa e justa' }
    ]
  },
  {
    id: 'renda_meta',
    type: 'cards',
    question: 'De qual patamar de recurso você precisa para conquistar esse sonho?',
    subQuestion: 'Selecione a faixa estimada de capital necessário. Nosso sistema buscará o enquadramento ideal.',
    options: [
      { id: 'renda_1', label: 'R$ 50 mil a R$ 150 mil', value: 'R$ 50.000 a R$ 150.000', iconName: 'DollarSign', description: 'Excelente para carros novos, reformas estratégicas ou capital de giro em projetos' },
      { id: 'renda_2', label: 'R$ 150 mil a R$ 350 mil', value: 'R$ 150.000 a R$ 350.000', iconName: 'Zap', description: 'Perfeito para terrenos bem localizados, apartamentos compactos ou utilitários' },
      { id: 'renda_3', label: 'R$ 350 mil a R$ 750 mil', value: 'R$ 350.000 a R$ 750.000', iconName: 'Sparkles', description: 'Casas de alto padrão familiar, galpões de alta operação ou frotas comerciais' },
      { id: 'renda_4', label: 'Acima de R$ 750 mil', value: 'Acima de R$ 750.000', iconName: 'Flame', description: 'Estratégias avançadas de alavancagem de investimentos ou imóveis de altíssimo luxo' }
    ]
  },
  {
    id: 'tempo',
    type: 'cards',
    question: 'Qual contribuição de parcela mensal se ajusta confortavelmente ao seu orçamento?',
    subQuestion: 'Nosso mecanismo exclusivo promove parcelas limpas, sem os juros das grandes instituições.',
    options: [
      { id: 'tempo_1', label: 'De R$ 300 a R$ 800 por mês', value: 'R$ 300 a R$ 800 por mês', iconName: 'Clock', description: 'Construção focada e leve para garantir as bases do seu próximo passo seguro' },
      { id: 'tempo_2', label: 'De R$ 800 a R$ 1.800 por mês', value: 'R$ 800 a R$ 1.800 por mês', iconName: 'Smartphone', description: 'Custo-benefício excelente com forte inclinação a recebimento em curto prazo' },
      { id: 'tempo_3', label: 'De R$ 1.800 a R$ 3.500 por mês', value: 'R$ 1.800 a R$ 3.500 por mês', iconName: 'Monitor', description: 'Contemplação acelerada projetada em menor espaço de tempo para bens urgentes' },
      { id: 'tempo_4', label: 'Acima de R$ 3.500 por mês', value: 'Acima de R$ 3.500 por mês', iconName: 'Activity', description: 'Planos corporativos sofisticados de grande velocidade para empresários e líderes' }
    ]
  },
  {
    id: 'ferramenta',
    type: 'cards',
    question: 'Qual é o cronograma de urgência que você toleraria para usufruir da conquista?',
    subQuestion: 'Defina a urgência para desenharmos as alças e alavancagens de liberação correspondentes.',
    options: [
      { id: 'ferr_1', label: 'Imediato / O Mais Rápido Possível (Aceleração Total)', value: 'Antecipação rápida com aporte', iconName: 'Flame', description: 'Possuo margem própria para forçar e acelerar o resgate das chaves ou do veículo' },
      { id: 'ferr_2', label: 'Prazo Planejado Estrategicamente pelo Método', value: 'Uso do mecanismo interno de resgate', iconName: 'TrendingUp', description: 'Quero usar o poder integrado do próprio sistema de alavancagem para adiantar' },
      { id: 'ferr_3', label: 'Sem Pressa Automática (Construir patrimônio com parcelas limpas)', value: 'Construção sólida de médio a longo prazo', iconName: 'Cpu', description: 'Pretendo economizar guardando mês a mês a menor taxa de custo histórico do país' }
    ]
  },
  {
    id: 'situacao',
    type: 'cards',
    question: 'Selecione qual benefício ou potencializador você possui para acelerar seu plano:',
    subQuestion: 'Selecione com honestidade para que o robô correlacione condições favoráveis ao seu nome.',
    options: [
      { id: 'sit_1', label: 'Uso de fundos parados ou reservas inativas (FGTS, etc)', value: 'FGTS / Reservas inativas utilizáveis', iconName: 'ShieldAlert', description: 'Desejo usar recursos adormecidos como força de atalho para encurtar os meses de espera' },
      { id: 'sit_2', label: 'Tenho bem de passeio ou utilitário usado para dar impulso', value: 'Bens usados para avaliação de resgate', iconName: 'Briefcase', description: 'Gostaria de avaliar a possibilidade de introduzir bens atuais para antecipação estratégica' },
      { id: 'sit_3', label: 'Quero usar a força secreta do adiantamento do próprio sistema', value: 'Adiantamento interno de até 30% da linha', iconName: 'TrendingUp', description: 'Usar o próprio poder do método (até 30% do teto) para acelerar e adiantar a posse' },
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
    content: 'Eu achava que demoraria décadas para dar uma casa própria digna pra minha família... mas usei o segredo que o consultor me ensinou no WhatsApp... Economizei mais de R$ 90 mil que eu daria pro banco de presente se fizesse um financiamento longo clássico. Realizei meu sonho em poucos meses! Parecia mentira mas a rota funciona mesmo.',
    likes: 54
  },
  {
    id: 't2',
    name: 'Henrique Vasconcelos',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 18 minutos',
    rating: 5,
    verified: true,
    content: 'O gerente do meu banco tradicional queria me cobrar quase outro carro só de juros em cima de juros... Fiz a simulação aqui de perfil de alavancagem confidencial e apertei o botão. O consultor no WhatsApp me passou as rotas sem juros e em pouquíssimo tempo já peguei as chaves, pagando uma mensalidade inacreditável. É outra vida!',
    likes: 31
  },
  {
    id: 't3',
    name: 'Rodrigo Antunes de Souza',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 45 minutos',
    rating: 5,
    verified: true,
    content: 'Sendo profissional autônomo, os bancos normais davam risada na minha cara ou exigiam entradas gigantescas que eu não tinha prontas. Esse diagnóstico inteligente foi o divisor de águas. Chamei o especialista no WhatsApp, ele desenhou a rota e hoje o meu consultório próprio de alto padrão está erguido e funcionando. Serviço transparente e impecável.',
    likes: 72
  },
  {
    id: 't4',
    name: 'Mariana Lima Santos',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    timeAgo: 'Há 2 horas',
    rating: 5,
    verified: true,
    content: 'Tinha um dinheiro parado rendendo quase zero. O consultor montou uma engenharia financeira tão simples de entender que me fez conquistar o meu imóvel com extrema tranquilidade, muito antes do prazo que eu imaginava. Recomendo imensamente.',
    likes: 24
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como este método secreto consegue livrar você dos juros dos bancos?',
    answer: 'Os bancos lucram cobrando juros sobre juros abusivos nos financiamentos de longo prazo. Nós utilizamos um mecanismo sob medida de direcionamento patrimonial que opera livre de juros rotativos comerciais. Em vez disso, o capital é disponibilizado através de um sistema de união estratégica com taxa fixa simbólica diluída uniformemente nas parcelas, reduzindo o custo total em até 60%.'
  },
  {
    question: 'Este protocolo é realmente seguro e regulado?',
    answer: 'Sim, totalmente confiável. Toda a engrenagem operacional e estruturação de alavancagem financeira que propomos funciona sob a fiscalização rígida e regularização sob normas oficiais e auditoria do Banco Central do Brasil, garantindo segurança jurídica plena para cada participante.'
  },
  {
    question: 'Como funciona o adiantamento de 30% nativo do sistema?',
    answer: 'Trata-se de uma estratégia de engenharia financeira na qual você pode autorizar que uma fração do seu próprio capital futuro em liberação seja empenhado eletronicamente para antecipar a liberação e entrega do patrimônio. Ou seja, você acelera drasticamente as chaves ou o veículo de forma legal e inteligente sem precisar arrumar esse dinheiro vivo extra hoje.'
  },
  {
    question: 'O diagnóstico é gratuito e o que recebo ao clicar no WhatsApp?',
    answer: 'O preenchimento do formulário inteligente de perfil é 100% gratuito. Ao final, a ferramenta gera seus dados de simulação e conecta você diretamente com o especialista responsável pela sua rota no WhatsApp. Ele revelará a tabela secreta de parcelas reduzidas e os prazos calculados sob medida para o seu orçamento.'
  }
];
