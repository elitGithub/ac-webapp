// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const BrokenLight: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Broken Light';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="broken_light"
      asset="assets/locations/school/gym/broken_light.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default BrokenLight;
