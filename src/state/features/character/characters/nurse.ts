// Types
import { BaseCharacter, defaultValues } from './base';

export interface NurseState extends BaseCharacter {
  id: 'nurse';
  plowcow: boolean;
}

export interface SetNurse extends Partial<NurseState> {
  character: 'nurse';
}

const values: NurseState = {
  ...defaultValues,
  id: 'nurse',
  name: 'Nurse',
  background: 'linear-gradient(to right, #b5dfbc 0%, #78c491 100%)',
  equipment: ['panties', 'shirt', 'outfit', 'bra'],
  plowcow: false,
};

export default values;
