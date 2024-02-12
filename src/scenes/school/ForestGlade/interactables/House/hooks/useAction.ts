// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { interact, potted_weeds_interact } from '../sequences';

export const useAction = () => {
  const { potted_weeds, forest_glade } = useAppSelector((state) => ({
    potted_weeds: state.quest.potted_weeds,
    forest_glade: state.scene.school_forest_glade,
  }));

  if (potted_weeds.phase === 'plow' && !forest_glade.got_plow) {
    return potted_weeds_interact();
  }

  return interact();
};
