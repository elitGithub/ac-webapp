// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Ladder: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Ladder';
  const description = useDescription();
  const action = useAction();
  const shouldRender = useAppSelector(
    (state) => !state.scene.school_gym.ladder_taken
  );

  return (
    <Interactable
      id="ladder"
      asset="assets/locations/school/gym/ladder.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender}
    />
  );
};

export default Ladder;
