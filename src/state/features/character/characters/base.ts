// Types
import type { SceneState } from '../../scene';

export interface DisplayModifiers {
  flip?: boolean;
  at?: number;
  with?: {
    appearFrom?: 'left' | 'right';
    disappearTo?: 'left' | 'right';
    dissolve?: number;
  };
}

export type Expression =
  | 'afraid'
  | 'angry'
  | 'annoyed'
  | 'blush'
  | 'concerned'
  | 'confident'
  | 'confused'
  | 'cringe'
  | 'crying'
  | 'displeased'
  | 'drugged_sleepy'
  | 'embarrassed'
  | 'excited'
  | 'eyeroll'
  | 'flirty'
  | 'gushing'
  | 'laughing'
  | 'neutral'
  | 'sad'
  | 'sarcastic'
  | 'skeptical'
  | 'surprised'
  | 'smile'
  | 'thinking'
  | 'worried'
  | ''
  | 'jacklynpose01'
  | 'gym_fall'
  | 'gym_carry'
  | 'clinic'
  | 'angel'
  ;

export interface BaseCharacter {
  name: string;
  background: string;
  expression: Expression;
  position: number;
  location: keyof SceneState | null;
  activity: string;
  equipment: string[];
  inventory: string[];
  love: number;
  lust: number;
  modifiers: DisplayModifiers;
  hidden_now: boolean;
  at_none_now: boolean;
  at_none_today: boolean;
  talk_limit_today: number;
  flirt_limit_today: boolean;
  flirt_bonuses_chosen: boolean;
}

export const defaultValues: BaseCharacter = {
  name: '{{mc}}',
  background: 'linear-gradient(to right, #d9bd8e 0%, #f8eddf 100%)',
  expression: '',
  activity: '',
  position: 0.5,
  location: 'home_hall',
  equipment: [],
  inventory: [],
  love: 1,
  lust: 1,
  modifiers: {},
  hidden_now: false,
  at_none_now: false,
  at_none_today: false,
  talk_limit_today: 0,
  flirt_limit_today: false,
  flirt_bonuses_chosen: false,
};
