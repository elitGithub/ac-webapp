// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Nurse: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  const isTalking = useAppSelector((state) =>
    state.character.current.includes('nurse')
  );

  return (
    <Interactable
      id="nurse"
      asset="assets/locations/school/nurse_room/nurse.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={!isTalking}
    />
  );
};

export default Nurse;
