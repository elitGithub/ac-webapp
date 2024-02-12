// Libararies
import React, { useEffect } from 'react';
import { cset, hide, show } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Expression } from 'state/features/character';

// Target
import { Flora } from './';

const Equipment = {
  bra: 'bra',
  panties: 'panties',
  shirt: 'shirt',
  business: 'business',
  pants: 'pants',
  skirt: 'skirt',
  hat: 'hat',
  blindfold: 'blindfold',
  vines: 'vines',
  cum: 'cum',
  wet: 'wet',
  phone: 'phone',
  hands_up: 'hands_up',
};

interface WrapperProps {
  equipment: (keyof typeof Equipment)[];
  expression: Expression;
}

const Wrapper: React.FC<WrapperProps> = ({ expression, equipment = [] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(show('flora', expression));

    return () => {
      dispatch(hide('flora'));
    };
  }, [dispatch, expression]);

  useEffect(() => {
    dispatch(
      cset({
        character: 'flora',
        equipment,
      })
    );
  }, [dispatch, equipment]);

  return <Flora />;
};

export default {
  title: 'Characters/Flora',
  components: Flora,
  argTypes: {
    expression: {
      options: [
        'afraid',
        'angry',
        'annoyed',
        'blush',
        'concerned',
        'confident',
        'confused',
        'cringe',
        'crying',
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
} as ComponentMeta<typeof Flora>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  expression: 'confident',
  equipment: ['panties', 'pants', 'shirt'],
};
