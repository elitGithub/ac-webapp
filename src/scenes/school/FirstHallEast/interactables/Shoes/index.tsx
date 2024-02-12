// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';

export const Shoes: React.FC<InteractableConfig> = ({
  id = '',
  asset = '',
  offset,
}) => {
  const title = 'Shoes';
  const description = '';
  const action = useAction(id);
  const shouldRender = useAppSelector(
    (state) =>
      !state.scene.school_first_hall_east[
        `${id}_moved` as keyof typeof state.scene.school_first_hall_east
      ]
  );

  return (
    <Interactable
      id={id}
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender}
    />
  );
};

export default Shoes;
