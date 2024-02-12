// Libraries
import React from 'react';

// Components
import Interactable, {
  Asset,
  InteractableConfig,
} from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Chair1: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();
  const asset = '';
  const Chair2Moved = useAppSelector(
    (state) => state.scene.school_art_class.chair2_moved
  );
  return (
    <Interactable
      id="chair1"
      //asset="assets/locations/school/art_class/chair1.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/art_class/chair1.webp"
        offset={{ x: 0, y: 135 }}
      />

      {Chair2Moved ? (
        <Asset
          asset="assets/locations/school/art_class/chair2_moved.webp"
          offset={{ x: 45, y: 54 }}
        />
      ) : (
        <Asset
          asset="assets/locations/school/art_class/chair2.webp"
          offset={{ x: 294, y: 36 }}
        />
      )}

      <Asset
        asset="assets/locations/school/art_class/chair3.webp"
        offset={{ x: 372, y: 197 }}
      />

      <Asset
        asset="assets/locations/school/art_class/chair4.webp"
        offset={{ x: 880, y: 0 }}
      />

      <Asset
        asset="assets/locations/school/art_class/chair5.webp"
        offset={{ x: 1181, y: 207 }}
      />
    </Interactable>
  );
};

export default Chair1;
