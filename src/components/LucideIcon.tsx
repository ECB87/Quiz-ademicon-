import React from 'react';
import {
  Home,
  Car,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  Zap,
  Sparkles,
  Flame,
  Clock,
  Smartphone,
  Monitor,
  Activity,
  Cpu,
  ShieldAlert,
  Briefcase,
  Play,
  LucideProps,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  ArrowRight,
  Info,
  Timer,
  CheckCircle,
  ThumbsUp,
  Menu,
  X,
  Lock,
  MessageCircle,
  AlertTriangle,
  Gift
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Home,
  Car,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  Zap,
  Sparkles,
  Flame,
  Clock,
  Smartphone,
  Monitor,
  Activity,
  Cpu,
  ShieldAlert,
  Briefcase,
  Play,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  ArrowRight,
  Info,
  Timer,
  CheckCircle,
  ThumbsUp,
  Menu,
  X,
  Lock,
  MessageCircle,
  AlertTriangle,
  Gift
};

interface LucideIconProps extends LucideProps {
  name: string;
}

export const LucideIcon: React.FC<LucideIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || Info;
  return <IconComponent {...props} />;
};

export default LucideIcon;
