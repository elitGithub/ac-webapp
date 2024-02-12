// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const DoorBathroom: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="door_bathroom"
      asset="assets/locations/home/hall/door_white.webp"
      nameplate={{ title, description, offset: { x: -450, y: -110 } }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default DoorBathroom;
