// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from 'characters/MrsL/hooks';

export const MrsL: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Mrs. L';
  const description = '';
  const action = useAction();

  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/school/gym/xray_full/mrsl_xray_full.webp';
      case 'partial':
        return 'assets/locations/school/gym/mrsl_xray.webp';
      case 'off':
        return 'assets/locations/school/gym/mrsl.webp';
    }
  });
  const isSpeaking = useAppSelector((state) =>
    state.character.current?.includes('mrsl')
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
