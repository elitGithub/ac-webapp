// Libararies
import React, { useEffect } from 'react';
import { cset, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { Nurse } from '.';

const Equipment = {
  bra: 'bra',
  panties: 'panties',
  shirt: 'shirt',
  outfit: 'outfit',
  oil: 'oil',
  phone: 'phone',
  masturbating: 'masturbating',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('nurse', expression));
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'nurse',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <Nurse />;
};

export default {
  title: 'Characters/Nurse',
  components: Nurse,
  argTypes: {
    expression: {
      options: [
        'afraid',
        'annoyed',
        'blush',
        'concerned',
        'neutral',
        'sad',
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
} as ComponentMeta<typeof Nurse>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'afraid',
  equipment: ['outfit'],
};
