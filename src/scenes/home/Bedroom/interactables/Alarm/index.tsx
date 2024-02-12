// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Alarm: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();
  const alarm = useAppSelector((state) => state.scene.home_bedroom.alarm);

  return (
    <Interactable
      id="alarm"
      asset={
        alarm?.startsWith('smashed')
          ? 'assets/locations/home/bedroom/alarm_broken.webp'
          : 'assets/locations/home/bedroom/alarm.webp'
      }
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default Alarm;
