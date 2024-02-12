// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';

export const Book: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Book';
  const description = '';
  const action = useAction();
  const shouldRender = useAppSelector(
    (state) => !state.scene.school_first_hall_east.book_taken
  );

  return (
    <Interactable
      id="book"
      asset="assets/locations/school/first_hall_east/book.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender}
    />
  );
};

export default Book;
