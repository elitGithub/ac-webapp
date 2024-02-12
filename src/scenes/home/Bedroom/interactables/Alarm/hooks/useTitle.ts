import { useAppSelector } from 'state/hooks';

export const useTitle = () => {
  const { kate_blowjob_dream, home_bedroom } = useAppSelector((state) => ({
    kate_blowjob_dream: state.quest.blowjob_dream.phase,
    home_bedroom: state.scene.home_bedroom,
  }));

  if (
    ['open_door', 'get_dressed'].includes(kate_blowjob_dream) &&
    home_bedroom.alarm !== 'smashed_again'
  ) {
    return 'Alarm';
  }

  if (home_bedroom.alarm?.startsWith('smashed')) {
    return 'Broken Alarm';
  }

  return 'Alarm';
};
