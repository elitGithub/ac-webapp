// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Vent: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Vent';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="vent"
      asset="assets/locations/school/first_hall_east/vent.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Vent;
