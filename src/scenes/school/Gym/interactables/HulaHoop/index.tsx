// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const HulaHoop: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Hula Hoop';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="hula_hoop"
      asset="assets/locations/school/gym/hoops.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default HulaHoop;
