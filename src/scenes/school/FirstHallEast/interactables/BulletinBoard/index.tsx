// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';

export const BulletinBoard: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Bulletin Board';
  const description = '';
  const action = useAction();

  return (
    <Interactable
      id="bulletin_board"
      asset="assets/locations/school/first_hall_east/board.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default BulletinBoard;
