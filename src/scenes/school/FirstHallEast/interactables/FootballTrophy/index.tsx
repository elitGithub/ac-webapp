// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const FootballTrophy: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Football Trophy';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="football_trophy"
      asset="assets/locations/school/first_hall_east/trophy.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default FootballTrophy;
