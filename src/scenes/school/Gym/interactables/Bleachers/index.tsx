// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Bleachers: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Bleachers';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="bleachers"
      asset="assets/locations/school/gym/bleachers.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Bleachers;
