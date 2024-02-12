// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const PingPongPaddle: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Ping Pong Paddle';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="ping_pong_paddle"
      asset="assets/locations/school/gym/paddles.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default PingPongPaddle;
