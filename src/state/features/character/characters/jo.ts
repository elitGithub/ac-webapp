// Types
import { BaseCharacter, defaultValues } from './base';

export interface JoState extends BaseCharacter {
  id: 'jo';
}

export interface SetJo extends Partial<JoState> {
  character: 'jo';
}

const values: JoState = {
  ...defaultValues,
  id: 'jo',
  name: 'Jo',
  background: 'linear-gradient(to right, #fcdd8e 0%, #ff666d 100%)',
  location: 'home_kitchen',
  activity: 'standing',
  equipment: ['panties', 'shirt', 'pants', 'glasses'],
};

export default values;
