// Libararies
import React, { useEffect } from 'react';
import { cset, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { MrsL } from './';

const Equipment = {
  bra: 'bra',
  panties: 'panties',
  shirt: 'shirt',
  bikini: 'bikini',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('mrsl', expression));
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'mrsl',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <MrsL />;
};

export default {
  title: 'Characters/MrsL',
  components: MrsL,
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
        'surprised',
        'thinking',
      ],
      control: { type: 'select' },
    },
    equipment: {
      control: 'check',
      options: Object.values(Equipment),
    },
  },
} as ComponentMeta<typeof MrsL>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'confident',
  equipment: ['panties', 'shirt', 'bra'],
};
