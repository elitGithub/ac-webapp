import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const { potted_weeds } = useAppSelector((state) => ({
    potted_weeds: state.quest.potted_weeds,
    // berb_fight: state.quest.berb_fight,
    // isabelle_hurricane: state.quest.isabelle_hurricane,
  }));

  if (potted_weeds.started)
    return 'This hut looks ancient. Possibly centuries old. Or decades, who knows? Either way, old beyond comprehension.';

  // if (berb_fight.finished)
  //   return 'Probably where the beaver keeps his human slaves.';

  return 'A relic of a past civilization. Aztec or Mayan in design.';
};
