// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const VendingMachine: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Vending Machine';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="vending_machine"
      asset="assets/locations/school/gym/vending_machine.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default VendingMachine;
