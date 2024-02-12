// TODO: Update the id - must be unique to the scene (globally unique not necessary)
// TODO: Update asset path (eg. assets/locations/home/bedroom/door.webp)

// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const BusStop: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="bus-stop"
      asset="assets/locations/school/entrance/carport.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default BusStop;
