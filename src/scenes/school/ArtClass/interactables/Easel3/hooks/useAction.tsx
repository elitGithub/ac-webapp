// Libraries
import { useAppSelector } from 'state/hooks';
import {
  interact,
  artFocusStart,
  artFocusPermission,
  artFocusUseItem,
} from '../sequences';

// Sequences

export const useAction = () => {
  const { jacklyn_art_focus, has_brush } = useAppSelector((state) => ({
    jacklyn_art_focus: state.quest.art_focus,
    has_brush: state.character.mc.inventory.includes('brush'),
  }));

  if (jacklyn_art_focus.phase === 'artist') {
    return artFocusUseItem();
  }

  if (jacklyn_art_focus.phase === 'canvas') {
    return artFocusStart();
  }

  if (!jacklyn_art_focus.started && has_brush) {
    return artFocusPermission();
  }
  return interact();
};
