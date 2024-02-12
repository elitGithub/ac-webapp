// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Stairs: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Stairs';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="stairs"
      asset="assets/locations/school/first_hall/stairs.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Stairs;
