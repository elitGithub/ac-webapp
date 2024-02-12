// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Jacklyn/hooks';

export const Jacklyn: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.jacklyn.name);
  const description = '';
  const action = useAction();
  const isStanding = useAppSelector(
    (state) => state.character.jacklyn.activity === 'standing'
  );
  const render = useRender(() => {
    if (!isStanding) return false;
    return true;
  });
  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/art_class/jacklyn_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/art_class/jacklyn_xray.webp';
      case 'off':
        return 'assets/locations/school/art_class/jacklyn.webp';
    }
  });

  return (
    <Interactable
      id="jacklyn"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default Jacklyn;
