// Libararies
import React, { useEffect } from 'react';
import { cset, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { Jacklyn } from './';

const Equipment = {
  hat: 'hat',
  squidpin: 'squidpin',
  shirt: 'shirt',
  pants: 'pants',
  panties: 'panties',
  bra: 'bra',
  right: 'right',
  mask: 'mask',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('jacklyn', expression));
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'jacklyn',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <Jacklyn />;
};

export default {
  title: 'Characters/Jacklyn',
  components: Jacklyn,
  argTypes: {
    expression: {
      options: [
        'angry',
        'annoyed',
        'cringe',
        'excited',
        'jacklynpose01',
        'laughing',
        'neutral',
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
} as ComponentMeta<typeof Jacklyn>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'angry',
  equipment: ['panties', 'pants', 'shirt', 'bra'],
};
