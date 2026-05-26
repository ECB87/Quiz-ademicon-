export interface QuizOption {
  id: string;
  label: string;
  iconName?: string;
  description?: string;
  value: string;
}

export type QuizStepType = 'cards' | 'radio' | 'slider';

export interface QuizStep {
  id: string;
  type: QuizStepType;
  question: string;
  subQuestion?: string;
  options?: QuizOption[];
  sliderMin?: number;
  sliderMax?: number;
  sliderStep?: number;
  sliderPrefix?: string;
  sliderSuffix?: string;
  defaultValue?: number | string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  timeAgo: string;
  rating: number;
  content: string;
  likes: number;
  replyCount?: number;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FunnelSettings {
  nicheTitle: string;
  landingHeadline: string;
  landingSubHeadline: string;
  ctaText: string;
  ctaUrl: string;
  cooldownMinutes: number;
  spotsCount: number;
  scarcityMessage: string;
}
