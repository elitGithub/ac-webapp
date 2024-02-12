// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const ExitArrow: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Back';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="exit_arrow"
      asset="assets/locations/school/first_hall_east/exit_arrow.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default ExitArrow;
