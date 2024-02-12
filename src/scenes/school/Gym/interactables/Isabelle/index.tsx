// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from 'characters/Isabelle/hooks';

export const Isabelle: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Isabelle';
  const description = '';
  const action = useAction();

  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/gym/xray_full/isabelle_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/gym/isabelle_xray.webp';
      case 'off':
        return 'assets/locations/school/gym/isabelle.webp';
    }
  });
  const isSpeaking = useAppSelector((state) =>
    state.character.current?.includes('isabelle')
  );

  return (
    <Interactable
      id="isabelle"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={!isSpeaking}
    />
  );
};

export default Isabelle;
