// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Kate/hooks';

export const Kate: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.kate.name);
  const description = '';
  const action = useAction();
  const render = useRender(() => {
    return true;
  });

  return (
    <Interactable
      id="kate"
      asset="assets/locations/school/art_class/kate.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default Kate;
