// Types
import { BaseCharacter, defaultValues } from './base';

export interface MCState extends BaseCharacter {
  id: 'mc';
  money: number;
  intellect: number;
  strength: number;
  charisma: number;
}

export interface SetMC extends Partial<MCState> {
  character: 'mc';
}

const values: MCState = {
  ...defaultValues,
  id: 'mc',
  name: '{{mc}}',
  money: 69,
  intellect: 1,
  strength: 1,
  charisma: 1,
};

export default values;
