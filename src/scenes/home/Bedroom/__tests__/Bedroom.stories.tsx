// Libraries
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ComponentStory } from '@storybook/react';
import { SceneProvider } from 'components/SceneContext';

// Target
import SceneBedroom from '../';
import { hasExpectedRequestMetadata } from '@reduxjs/toolkit/dist/matchers';

export default {
  title: 'Scenes/Home Bedroom',
};

const Template = () => (
  <SceneProvider className="visible">
    <SceneBedroom />
  </SceneProvider>
);

export const Default = Template.bind({});

export const SmashOrPassLeaveIt: ComponentStory<typeof SceneBedroom> =
  Template.bind({});
SmashOrPassLeaveIt.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement.parentElement as HTMLElement);

  const alarm = await canvas.findByTestId('interactable-alarm');
  expect(alarm).toBeVisible();

  userEvent.click(alarm);

  const output1 = await canvas.findByText('What should I do with this thing?');
  expect(output1).toBeInTheDocument();

  const next = await canvas.findByTestId('next-text');
  userEvent.click(next);

  const choice = await canvas.findByText('Leave it');
  userEvent.click(choice);

  const output2 = await canvas.findByText(
    'The melody of a better time. Might as well let it bump.'
  );
  expect(output2).toBeInTheDocument();

  userEvent.click(next);

  await waitForElementToBeRemoved(output2);

  expect(output2).not.toBeInTheDocument();
};
