// Libraries
import React from 'react';

// Components
import Interactable, {
  Asset,
  InteractableConfig,
} from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Windows: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Window';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="windows"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/gym/window_left.webp"
        offset={{ x: 0, y: 0 }}
      />

      <Asset
        asset="assets/locations/school/gym/window_right.webp"
        offset={{ x: 739, y: 85 }}
      />
    </Interactable>
  );
};

export default Windows;
