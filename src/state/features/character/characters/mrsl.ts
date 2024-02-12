// Types
import { BaseCharacter, defaultValues } from './base';

export interface MrsLState extends BaseCharacter {
  id: 'mrsl';
}

export interface SetMrsL extends Partial<MrsLState> {
  character: 'mrsl';
}

const values: MrsLState = {
  ...defaultValues,
  id: 'mrsl',
  name: 'Mrs L.',
  background: 'linear-gradient(to right, #cd8192 0%, #a3394f 100%)',
  equipment: ['panties', 'shirt', 'pants', 'dressbraless', 'corset'],
};

export default values;
