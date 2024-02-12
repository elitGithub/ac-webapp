// Libraries
import { useAppSelector } from 'state/hooks';
import {
  interact,
  interactLindseyBook,
  interactKateSearchForNurse,
} from '../sequences';

// Sequences

export const useAction = () => {
  const state = useAppSelector((state) => ({
    interacted: state.scene.school_art_class.wooden_ship_interacted,
    gotStick: state.scene.school_art_class.stick_interacted,
  }));

  if (!state.interacted) {
    return interact();
  }
  if (!state.gotStick) {
    return interactLindseyBook();
  } else {
    return interactKateSearchForNurse();
  }

  // This is just for type safety, we should never reach this point
  return (function* () {})();
};
