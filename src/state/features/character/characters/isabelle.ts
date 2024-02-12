// Types
import { BaseCharacter, defaultValues } from './base';

export interface IsabelleState extends BaseCharacter {
  id: 'isabelle';
}

export interface SetIsabelle extends Partial<IsabelleState> {
  character: 'isabelle';
}

const values: IsabelleState = {
  ...defaultValues,
  id: 'isabelle',
  name: 'Isabelle',
  background: 'linear-gradient(to right, #fc8940 0%, #faf1c6 100%)',
  equipment: [
    'body',
    'arm',
    'face',
    'glasses',
    'panties',
    'shirt',
    'pants',
    'bra',
    // 'spinach',
    // 'holdingpanties',
  ],
};

export default values;
