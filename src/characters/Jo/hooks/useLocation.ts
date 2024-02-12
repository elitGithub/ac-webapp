// Libraries
import { useAppSelector } from 'state/hooks';

// Calculate Jo's current location from state
export const useLocation = () => {
  // Fetch data
  const hour = useAppSelector((state) => state.time.hour);

  // Forced locations

  // Quest: Blowjob Dream
  const blowjobDream = useAppSelector((state) => state.quest.blowjob_dream);
  if (['get_dressed', 'school', 'awake', 'alarm'].includes(blowjobDream.phase))
    return {
      location: null,
    };

  // Quest: Back to School Special
  const backToSchoolSpecial = useAppSelector(
    (state) => state.quest.back_to_school_special
  );

  if (backToSchoolSpecial.in_progress) {
    if (
      ['back_to_school_special', 'talk_to_jo'].includes(
        backToSchoolSpecial.phase
      )
    ) {
      return {
        location: 'home_kitchen',
        activity: 'reading',
      };
    } else {
      return {
        location: null,
      };
    }
  }

  // Quest: Cooking Chilli
  const cookingChilli = useAppSelector((state) => state.quest.cooking_chilli);

  if (cookingChilli.phase === 'get_milk')
    return {
      location: 'home_kitchen',
      activity: 'standing',
    };

  if (cookingChilli.phase === 'distracted')
    return {
      location: null,
    };

  // Only force Jo out of the kitchen during 'bring_pot' phase in the morning
  if (cookingChilli.phase === 'bring_pot' && [7, 8].includes(hour))
    return {
      location: null,
    };

  // Schedule

  // 7:00 - 9:00
  if (hour >= 7 && hour < 9)
    return {
      location: 'home_kitchen',
      activity: 'reading',
    };

  // 9:00 - 17:00
  if (hour >= 9 && hour < 17)
    return {
      location: 'school_cafeteria',
      activity: 'coffee',
    };

  // 18:00 - 20:00
  if (hour >= 18 && hour < 20)
    return {
      location: 'home_kitchen',
      activity: 'standing',
    };

  return {
    location: null,
  };
};
