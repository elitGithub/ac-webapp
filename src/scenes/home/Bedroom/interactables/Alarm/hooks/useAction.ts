// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import {
  smashOrPassBeeping,
  smashOrPassOff,
  smashOrPassSmashed,
} from '../sequences';

export const useAction = () => {
  const { smash_or_pass, alarm } = useAppSelector((state) => ({
    smash_or_pass: state.quest.smash_or_pass,
    alarm: state.scene.home_bedroom.alarm,
  }));

  if (smash_or_pass.ended) {
    if (alarm === 'off') return smashOrPassOff();
    else return smashOrPassSmashed();
  }

  if (smash_or_pass.started) return smashOrPassBeeping();

  return (function* () {})();
};
