// TODO: Update the interactable name and default export, use TitleCase
// TODO: Update the id - must be unique to the scene (globally unique not necessary)
// TODO: Update asset path (eg. assets/locations/home/bedroom/door.webp)

// Libraries
import React from 'react';

// Components
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';


// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const ChapterSelect: React.FC<InteractableWithTextConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <InteractableWithText
      id="chapter-select"
      asset="assets/ui/frame_button.webp"
      innerText={{
        title: title,
        textCenter: true
      }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default ChapterSelect;
