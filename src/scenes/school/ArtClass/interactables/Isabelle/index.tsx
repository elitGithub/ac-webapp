// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Isabelle/hooks';

export const Isabelle: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.isabelle.name);
  const description = '';
  const action = useAction();
  const isabelle = useAppSelector((state) => state.character.isabelle);
  const render = useRender(() => {
    return true;
  });
  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/art_class/isabelle_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/art_class/isabelle_xray.webp';
      case 'off':
        if (isabelle.equipment.includes('skirt')) {
          return 'assets/locations/school/art_class/isabelle_skirt.webp';
        } else {
          return 'assets/locations/school/art_class/isabelle.webp';
        }
    }
  });

  return (
    <Interactable
      id="isabelle"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default Isabelle;
