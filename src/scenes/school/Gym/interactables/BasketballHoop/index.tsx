// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const BasketballHoop: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Basketball Hoop';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="basketball_hoop"
      asset="assets/locations/school/gym/backboard_bottom.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default BasketballHoop;
