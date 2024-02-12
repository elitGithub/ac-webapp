// Libraries
import React, { memo } from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const FloraRoomDoor: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="door_flora"
      asset="assets/locations/home/hall/door_center.webp"
      title={title}
      description={description}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default memo(FloraRoomDoor);
