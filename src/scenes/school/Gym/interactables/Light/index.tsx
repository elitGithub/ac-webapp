// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Light: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Light';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="light"
      asset="assets/locations/school/gym/light.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Light;
