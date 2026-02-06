export type AvatarType = 'rose' | 'moon' | 'phoenix' | 'heart' | 'shadow' | 'angel';

export type CategoryId = 'love' | 'heartbreak' | 'friendship' | 'family' | 'self-love';

export interface Message {
  id: string;
  category: CategoryId;
  avatar: AvatarType;
  displayName: string;
  content: string;
  createdAt: Date;
}

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
  glowColor: string;
  x: number;
  y: number;
  branchPath: string;
}
