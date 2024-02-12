// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Curtain: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Curtain';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="curtain"
      asset="assets/locations/school/nurse_room/curtain_closed.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Curtain;
