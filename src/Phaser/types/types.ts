import PhoneManager from '../GameState/PhoneManager';
import PlayerManager from '../GameState/PlayerManager';
import { TimeManager } from '../GameState/TimeManager';
import QuestManager from '../GameState/QuestManager';
import XrayManager from '../GameState/XrayManager';

export type gameText = {
  speaker: string;
    name: string;
  content: string;
  choices: Choice[];
  sound?: string;
  showScene?: string;
  action?: string;
  dialogMode?: string;
}[];

export type Choice = {
  id: string;
  content: string;
  response?: string;
};

export interface PhoneApp {
  id: string;
  name: string;
  // Other properties as required
}

export interface PhoneContact {
  id: string;
  name: string;
  number?: string;
  avatar?: string;
  // Other properties as required
}

export interface TextMessage {
  who: PhoneContact;
  text: string;
  time: string;
}

export interface InteractableItem {
  label: string;
  click_message: string[];
  can_take: boolean;
  taken: boolean;
}

export type Location =
  'bedroom' |
  'home_bedroom' |
  'home_hall' |
  'home_kitchen' |
  'school_entrance' |
  'school_forest_glade' |
  'school_ground_floor' |
  'school_homeroom' |
  'school_first_hall' |
  'school_first_hall_west' |
  'school_ground_floor_west' |
  'school_nurse_room' |
  'school_first_hall_east' |
  'school_art_class' |
  '' |
  'school_gym';


export type Attributes = 'intellect' | 'strength' | 'charisma';

export interface BaseCharacter {
  id: string;
  name: string;
  background: string;
  expression: Expression;
  position: number;
  location: Location;
  activity: string;
  equipment: string[];
  inventory: string[];
  love: number;
  lust: number;
  hidden_now: boolean;
  at_none_now: boolean;
  at_none_today: boolean;
  talk_limit_today: number;
  flirt_limit_today: boolean;
  flirt_bonuses_chosen: boolean;
  phone_no: string;
  icon: any;
}

export type MainAttributes = {
  intellect: number;
  strength: number;
  charisma: number;
};

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

export type StateObject = {
  phone: PhoneManager;
  time: TimeManager;
  player: PlayerManager;
  quest: QuestManager;
  xRay: XrayManager;
  [key: string]: any; // You can include other keys if needed
};

export interface QuestInterface {
  id: string;
  name: string;
  stages: {},
  started: boolean;
  preconditions: any;
}

export type GradientStyle = {  topLeft: number,
  topRight: number,
  bottomLeft: number,
  bottomRight: number,
  alphaTopLeft?: number,
  alphaTopRight?: number,
  alphaBottomLeft?: number,
  alphaBottomRight?: number};

export type EventCallback = (...args: any[]) => void;
