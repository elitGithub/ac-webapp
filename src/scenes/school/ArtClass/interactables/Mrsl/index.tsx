// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction } from 'characters/MrsL/hooks';

export const Mrsl: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'MrsL';
  const description = '';
  const action = useAction();
  const render = useRender(() => {
    return true;
  });

  return (
    <Interactable
      id="mrsl"
      asset="assets/locations/school/art_class/mrsl.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default Mrsl;
