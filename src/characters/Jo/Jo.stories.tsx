// Libararies
import React, { useEffect } from 'react';
import { cset, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { Jo } from './';

const Equipment = {
  bra: 'bra',
  panties: 'panties',
  glasses: 'glasses',
  shirt: 'shirt',
  pants: 'pants',
  cup: 'cup',
  phone: 'phone',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('jo', expression));
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'jo',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <Jo />;
};

export default {
  title: 'Characters/Jo',
  components: Jo,
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
        'displeased',
        'embarrassed',
        'excited',
        'eyeroll',
        'flirty',
        'laughing',
        'neutral',
        'sad',
        'sarcastic',
        'skeptical',
        'smile',
        'thinking',
        'worried',
      ],
      control: { type: 'select' },
    },
    equipment: {
      control: 'check',
      options: Object.values(Equipment),
    },
  },
} as ComponentMeta<typeof Jo>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'confident',
  equipment: ['panties', 'pants', 'shirt', 'glasses'],
};
