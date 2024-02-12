// Libraries
import React, { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Isabelle: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/first_hall_west/isabelle_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/first_hall_west/isabelle_xray.webp';
      case 'off':
        return 'assets/locations/school/first_hall_west/isabelle.webp';
    }
  });
  const isSpeaking = useAppSelector((state) =>
    state.character.current.includes('isabelle')
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
