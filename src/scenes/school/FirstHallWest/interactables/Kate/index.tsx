// Libraries
import React, { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Kate: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/first_hall_west/kate_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/first_hall_west/kate_xray.webp';
      case 'off':
        return 'assets/locations/school/first_hall_west/kate.webp';
    }
  });
  const isSpeaking = useAppSelector((state) =>
    state.character.current.includes('kate')
  );

  return (
    <Interactable
      id="kate"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={!isSpeaking}
    />
  );
};

export default Kate;
