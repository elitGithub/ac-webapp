// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, {
  Asset,
  InteractableConfig,
} from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const KiddiePool: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Kiddie Pool';
  const description = useDescription();
  const action = useAction();
  const shouldRender = useAppSelector(
    (state) => false /* TODO: quest.poolside_story == "tryout" */
  );

  return (
    <Interactable
      id="kiddie_pool"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender}
    >
      <Asset
        asset="assets/locations/school/gym/pool.webp"
        offset={{ x: 0, y: 0 }}
      />

      <Asset
        asset="assets/locations/school/gym/water.webp"
        offset={{ x: 28, y: 31 }}
      />
    </Interactable>
  );
};

export default KiddiePool;
