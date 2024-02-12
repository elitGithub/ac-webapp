// TODO: Update the interactable name and default export, use TitleCase
// TODO: Update the id - must be unique to the scene (globally unique not necessary)
// TODO: Update asset path (eg. assets/locations/home/bedroom/door.webp)

// Libraries
import React from 'react';

// Components
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';

// Definitions
import { useAction } from './hooks/useAction';
import { useTitle } from './hooks/useTitle';

export const NewGame: React.FC<InteractableWithTextConfig> = ({ offset }) => {
  const title = useTitle();
  const action = useAction();

  return (
    <InteractableWithText
      id="new-game"
      asset="assets/ui/frame_button.webp"
      innerText={{
        title: title,
        textCenter: true
      }}
      action={action}
      offset={offset}
      render
    />
  );
};

export default NewGame;
