// Types
import { BaseCharacter, defaultValues } from './base';

export interface KateState extends BaseCharacter {
  id: 'kate';
}

export interface SetKate extends Partial<KateState> {
  character: 'kate';
}

const values: KateState = {
  ...defaultValues,
  id: 'kate',
  name: 'Kate',
  background: 'linear-gradient(to right, #FDCA55 0%, #FFFDE7 100%)',
  location: 'home_kitchen',
  equipment: ['panties', 'shirt', 'pants', 'bra', 'necklace'],
};

export default values;
