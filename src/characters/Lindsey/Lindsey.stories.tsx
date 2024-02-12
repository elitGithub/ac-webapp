// Libararies
import React, { useEffect } from 'react';
import { cset, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { Lindsey } from './';

const Equipment = {
  album: 'album',
  keyring: 'keyring',
  keyring_glow: 'keyring_glow',
  panties: 'panties',
  bra: 'bra',
  towel: 'towel',
  skirt: 'skirt',
  sweatpants: 'sweatpants',
  jacket: 'jacket',
  cropped_hoodie: 'cropped_hoodie',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('lindsey', expression));
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'lindsey',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <Lindsey />;
};

export default {
  title: 'Characters/Lindsey',
  components: Lindsey,
  argTypes: {
    expression: {
      options: [
        'afraid',
        'angry',
        'annoyed',
        'blush',
        'concerned',
        'confident',
        'cringe',
        'excited',
        'eyeroll',
        'flirty',
        'laughing',
        'neutral',
        'sad',
        'skeptical',
        'smile',
        'thinking',
      ],
      control: { type: 'select' },
    },
    equipment: {
      control: 'check',
      options: Object.values(Equipment),
    },
  },
} as ComponentMeta<typeof Lindsey>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'confident',
  equipment: ['panties', 'bra', 'skirt', 'jacket'],
};

export const AngryNude = Template.bind({});
AngryNude.args = {
  expression: 'angry',
  equipment: [],
};

export const AngryUnderwear = Template.bind({});
AngryUnderwear.args = {
  expression: 'angry',
  equipment: ['panties', 'bra'],
};

export const Angry = Template.bind({});
Angry.args = {
  expression: 'angry',
  equipment: ['panties', 'bra', 'jacket', 'skirt'],
};
