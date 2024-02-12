// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const VolleyballNet: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Volleyball Net';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="volleyball_net"
      asset="assets/locations/school/gym/net.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default VolleyballNet;
