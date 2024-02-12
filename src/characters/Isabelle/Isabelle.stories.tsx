// Libararies
import React, { useEffect } from 'react';
import { cset, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { Isabelle } from './';

const Equipment = {
  left: 'left',
  spinach: 'spinach',
  glasses: 'glasses',
  panties: 'panties',
  bra: 'bra',
  pants: 'pants',
  shirt: 'shirt',
  holdingpanties: 'holdingpanties',
  untucked: 'untucked',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('isabelle', expression));
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'isabelle',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <Isabelle />;
};

export default {
  title: 'Characters/Isabelle',
  components: Isabelle,
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
} as ComponentMeta<typeof Isabelle>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'confident',
  equipment: ['panties', 'pants', 'shirt', 'glasses'],
};
