// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { interact } from '../sequences';

export const useAction = (id: string) => {
  const { school_first_hall_east } = useAppSelector((state) => ({
    school_first_hall_east: state.scene.school_first_hall_east,
  }));

  // TODO: Conditionally return an action to perform
  // if (smash_or_pass.ended) {
  //   if (home_bedroom.alarm === 'off') return smashOrPassOff;
  // }

  // This is just for type safety, we should never reach this point
  return interact({
    id,
    pile_of_shoes: school_first_hall_east.pile_of_shoes ?? 0,
  });
};
