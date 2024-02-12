// Types
import { BaseCharacter, defaultValues } from './base';

export interface LindseyState extends BaseCharacter {
  id: 'lindsey';
  romance_disabled: boolean;
}

export interface SetLindsey extends Partial<LindseyState> {
  character: 'lindsey';
}

const values: LindseyState = {
  ...defaultValues,
  id: 'lindsey',
  name: 'Lindsey',
  background: 'linear-gradient(to right, #75d0ee 0%, #dcfcf8 100%)',
  equipment: ['panties', 'bra', 'skirt', 'jacket'],
  romance_disabled: false,
};

export default values;
