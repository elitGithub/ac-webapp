// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Door: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Door';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="door"
      asset="assets/locations/school/nurse_room/door.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Door;
