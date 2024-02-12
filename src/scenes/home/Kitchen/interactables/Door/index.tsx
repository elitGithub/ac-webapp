// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Door: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="door"
      asset="assets/locations/home/kitchen/door.webp"
      nameplate={{ title, description, offset: { x: 140, y: 150 } }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Door;
