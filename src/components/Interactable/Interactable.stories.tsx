// Libraries

// Target
import { Interactable } from './';

// Types
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { Sequence } from 'components/SequenceContext';

export default {
  title: 'UI/Interactable',
  components: Interactable,
  argTypes: {},
} as ComponentMeta<typeof Interactable>;

export const Primary: ComponentStory<typeof Interactable> = ({
  asset,
  nameplate,
  render,
}) => {
  const action: Sequence = (function* () {})();

  return (
    <Interactable
      id="test"
      asset={asset}
      nameplate={{ title: nameplate.title, description: nameplate.description }}
      action={action}
      offset={{ x: 500, y: 500, z: 1 }}
      render={render}
    />
  );
};
Primary.args = {
  asset: 'assets/locations/home/bedroom/alarm.webp',
  nameplate: {title: 'Alarm', description: 'Finally, some peace and quiet. More sleep!'},
  render: true,
};
