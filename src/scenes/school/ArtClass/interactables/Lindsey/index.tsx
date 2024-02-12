// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Lindsey/hooks';

export const Lindsey: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.lindsey.name);
  const description = '';
  const action = useAction();
  const render = useRender(() => {
    return true;
  });
  const lindsey = useAppSelector((state) => state.character.lindsey);
  const asset = useAppSelector((state) => {
    if (lindsey.activity == 'naked') {
      return 'assets/locations/school/art_class/lindseynaked.webp';
    } else {
      switch (state.display.xray) {
        case 'full':
          return 'assets/locations/school/art_class/lindsey_xray_full.webp';
        case 'partial':
          if (lindsey.equipment.includes('mcshirt')) {
            return 'assets/locations/school/art_class/lindseyshirt_xray.webp';
          } else {
            return 'assets/locations/school/art_class/lindsey_xray.webp';
          }
        case 'off':
          if (lindsey.equipment.includes('mcshirt')) {
            return 'assets/locations/school/art_class/lindseyshirt.webp';
          } else {
            return 'assets/locations/school/art_class/lindsey.webp';
          }
      }
    }
  });

  return (
    <Interactable
      id="lindsey"
      asset="assets/locations/school/art_class/lindsey.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default Lindsey;
