// Libraries
import { useAppSelector } from 'state/hooks';
import { interact, ArtFocusPaint } from '../sequences';

// Sequences

export const useAction = () => {
  const { kate_blowjob_dream, jacklyn_art_focus } = useAppSelector((state) => ({
    kate_blowjob_dream: state.quest.blowjob_dream.phase,
    jacklyn_art_focus: state.quest.art_focus.phase,
  }));

  //if (kate_blowjob_dream == 'school') {
  //  return kate_blowjob_dream_random_interact();
  //}

  if (jacklyn_art_focus === 'paint') {
    return ArtFocusPaint();
  }

  // This is just for type safety, we should never reach this point
  return interact();
};
