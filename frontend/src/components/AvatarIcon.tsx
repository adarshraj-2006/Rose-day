import { Flower2, Moon, Flame, Heart, Ghost, Sparkles } from 'lucide-react';
import { AvatarType } from '@/types/emotions';

const avatarConfig: Record<AvatarType, { icon: typeof Heart; colorVar: string }> = {
  rose: { icon: Flower2, colorVar: 'var(--avatar-rose)' },
  moon: { icon: Moon, colorVar: 'var(--avatar-moon)' },
  phoenix: { icon: Flame, colorVar: 'var(--avatar-phoenix)' },
  heart: { icon: Heart, colorVar: 'var(--avatar-heart)' },
  shadow: { icon: Ghost, colorVar: 'var(--avatar-shadow)' },
  angel: { icon: Sparkles, colorVar: 'var(--avatar-angel)' },
};

interface AvatarIconProps {
  type: AvatarType;
  size?: number;
  className?: string;
}

export const AvatarIcon = ({ type, size = 24, className = '' }: AvatarIconProps) => {
  const { icon: Icon, colorVar } = avatarConfig[type];
  return <Icon size={size} className={className} style={{ color: `hsl(${colorVar})` }} />;
};
