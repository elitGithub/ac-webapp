
// Sequences
import { gotoMainMenu } from '../sequences';

export const useAction = () => {
  // TODO: Conditionally return an action to perform
  // if (smash_or_pass.ended) {
  //   if (home_bedroom.alarm === 'off') return smashOrPassOff;
  // }

  // This is just for type safety, we should never reach this point
  return gotoMainMenu();
};
