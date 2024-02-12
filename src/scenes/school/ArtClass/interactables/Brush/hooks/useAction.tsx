import { useAppSelector } from 'state/hooks';
// Sequences
import { take, artFocusTake } from '../sequences';

export const useAction = () => {
  const { jacklyn_art_focus_phase } = useAppSelector((state) => ({
    jacklyn_art_focus_phase: state.quest.art_focus.phase,
  }));
  if (jacklyn_art_focus_phase === 'brush') {
    return artFocusTake();
  } else {
    return take();
  }
};
