// Libraries
import React, { useEffect } from 'react';
import { useAppDispatch } from 'state/hooks';
import { text } from 'state/actions';

// Components
import TextDisplay from './';

// Types
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CharactersState } from 'state/features/character';

interface WrapperProps {
  content: string;
  speaker?: keyof CharactersState;
}

const Wrapper: React.FC<WrapperProps> = ({ content = '', speaker }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(text(content, speaker));
  }, [dispatch, content, speaker]);

  return <TextDisplay />;
};

export default {
  title: 'UI/Text Display',
  component: TextDisplay,
  argTypes: {
    speaker: {
      control: {
        type: 'select',
        options: [
          'jo',
          'flora',
          'kate',
          'lindsey',
          'nurse',
          'mrsl',
          'isabelle',
        ],
      },
    },
  },
};

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <Wrapper {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  content: 'Lorem ipsum *dolor* sit amet.',
  speaker: 'jo',
};
