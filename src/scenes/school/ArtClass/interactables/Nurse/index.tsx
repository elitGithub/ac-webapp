// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Nurse/hooks';

export const Nurse: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Nurse';
  const description = '';
  const action = useAction();

  return (
    <Interactable
      id="nurse"
      asset="assets/locations/school/art_class/nurse.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={false}
    />
  );
};

export default Nurse;
