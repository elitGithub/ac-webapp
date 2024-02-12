// Types
import { BaseCharacter, defaultValues } from './base';
import { useLocation } from 'characters/Jacklyn/hooks/useLocation';

export interface JacklynState extends BaseCharacter {
  id: 'jacklyn';
}

export interface SetJacklyn extends Partial<JacklynState> {
  character: 'jacklyn';
}

const values: JacklynState = {
  ...defaultValues,
  id: 'jacklyn',
  name: 'Jacklyn',
  //location: useLocation().location || null, I wanted to try this, but it did not work
  //activity: useLocation().activity || '', because I broke the hook rules.
  location: 'school_art_class',
  activity: 'standing',
  background: 'linear-gradient(to right, #16b28b 0%, #0f7c61 100%)',
  equipment: ['shirt', 'pants', 'panties', 'bra'],
};

export default values;
