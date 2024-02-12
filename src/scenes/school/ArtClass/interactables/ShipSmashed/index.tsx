// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const ShipSmashed: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="ship_smashed"
      asset="assets/locations/school/art_class/ship_smashed.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default ShipSmashed;
