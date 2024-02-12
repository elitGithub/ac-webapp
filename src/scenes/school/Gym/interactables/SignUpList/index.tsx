// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const SignUpList: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Sign-Up List';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="signup_list"
      asset="assets/locations/school/gym/signup.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default SignUpList;
