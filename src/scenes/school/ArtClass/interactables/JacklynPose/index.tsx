// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';
import { useAppSelector } from 'state/hooks';

// Definitions
import { useAction, useRender } from 'characters/Jacklyn/hooks';

export const JacklynPose: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.jacklyn.name);
  const description = '';
  const action = useAction();
  const isPosing = useAppSelector(
    (state) => state.character.jacklyn.activity === 'pose'
  );
  const render = useRender(() => {
    if (!isPosing) return false;
    return true;
  });

  return (
    <Interactable
      id="jacklyn_pose"
      asset="assets/locations/school/art_class/jacklyn_pose.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default JacklynPose;
