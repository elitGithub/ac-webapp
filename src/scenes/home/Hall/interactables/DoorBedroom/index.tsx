// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const DoorBedroom: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="door_bedroom"
      asset="assets/locations/home/hall/door_right.webp"
      nameplate={{ title, description, offset: { x: -200, y: 100 } }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default DoorBedroom;
