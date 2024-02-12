// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const VentAjar: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Vent';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="vent_ajar"
      asset="assets/locations/school/first_hall_east/openvent.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default VentAjar;
