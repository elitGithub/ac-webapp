// Libraries
import React, { useMemo } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';
import { getEquipment } from 'state/features/character';

export const MrsL: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();
  const { bra } = useAppSelector((state) => getEquipment(state.character.mrsl));

  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/first_hall_west/mrsl_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/first_hall_west/mrsl_xray.webp';
      case 'off':
        if (bra) return 'assets/locations/school/first_hall_west/mrsl.webp';
        else return 'assets/locations/school/first_hall_west/mrsl.webp';
    }
  });
  const isSpeaking = useAppSelector((state) =>
    state.character.current.includes('mrsl')
  );

  return (
    <Interactable
      id="mrsl"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={!isSpeaking}
    />
  );
};

export default MrsL;
