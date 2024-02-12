// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const ExitDoor: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Door';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="exit_door"
      asset="assets/locations/school/gym/door_right.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default ExitDoor;
