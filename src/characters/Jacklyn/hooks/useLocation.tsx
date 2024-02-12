// Libraries
import { useAppSelector } from 'state/hooks';
import type { SceneState } from 'state/features/scene';

// Calculate Character's current location from state
export const useLocation = (): {
  location: keyof SceneState | null;
  activity?: string;
} => {
  // Fetch data
  const hour = useAppSelector((state) => state.time.hour);

  // Forced locations

  // Quest: Blowjob Dream
  const blowjobDream = useAppSelector((state) => state.quest.blowjob_dream);
  if (['get_dressed', 'school', 'awake', 'alarm'].includes(blowjobDream.phase))
    return {
      location: null,
    };

  // Schedule

  if (hour >= 7 && hour < 9)
    return {
      location: 'school_art_class',
      activity: 'standing',
    };

  if (hour >= 12 && hour < 13)
    return {
      location: null, //'school_cafeteria', //TODO: add cafeteria
      activity: 'sitting',
    };

  if (hour >= 13 && hour < 16)
    return {
      location: 'school_art_class',
      activity: 'standing',
    };

  if (hour >= 16 && hour < 19)
    if (false) {
      //if school_art_class["nude_model"] == self:
      return {
        location: 'school_art_class',
        activity: 'pose',
      };
    } else {
      return {
        location: 'school_art_class',
        activity: 'standing',
      };
    }
  return {
    location: null,
  };
};
