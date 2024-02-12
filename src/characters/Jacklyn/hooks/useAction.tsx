// Libraries
import { useAppSelector } from 'state/hooks';
import { jacklynTalkOne } from '../sequences';
import { ArtFocusStart, ArtFocusShowJacklyn } from 'quests/artFocus';
// Sequences

export const useAction = () => {
  const { jacklyn_art_focus } = useAppSelector((state) => ({
    jacklyn_art_focus: state.quest.art_focus,
  }));
  if (!jacklyn_art_focus.started) {
    return ArtFocusStart();
  }
  if (jacklyn_art_focus.phase === 'showjacklyn') {
    return ArtFocusShowJacklyn();
  }
  return jacklynTalkOne();
};
