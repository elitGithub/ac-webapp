// Types
import { BaseCharacter, defaultValues } from './base';

export interface FloraState extends BaseCharacter {
  id: 'flora';
}

export interface SetFlora extends Partial<FloraState> {
  character: 'flora';
}

const values: FloraState = {
  ...defaultValues,
  id: 'flora',
  name: 'Flora',
  background: 'linear-gradient(to right, #7f62de 0%, #e6d9e6 100%)',
  equipment: ['panties', 'shirt', 'pants', 'bra'],
};

export default values;
