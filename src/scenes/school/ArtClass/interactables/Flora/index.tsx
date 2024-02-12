// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Flora/hooks';

export const Flora: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.flora.name);
  const description = '';
  const action = useAction();
  const render = useRender(() => {
    return true;
  });
  const flora = useAppSelector((state) => state.character.flora);
  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/art_class/flora_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/art_class/flora_xray.webp';
      case 'off':
        if (flora.equipment.includes('skirt')) {
          return 'assets/locations/school/art_class/flora_skirt.webp';
        } else {
          return 'assets/locations/school/art_class/flora.webp';
        }
    }
  });

  return (
    <Interactable
      id="flora"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default Flora;
