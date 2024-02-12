import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const { kate_blowjob_dream } = useAppSelector((state) => ({
    kate_blowjob_dream: state.quest.blowjob_dream.phase,
  }));

  if (kate_blowjob_dream == 'school') {
    return ''; //TODO: dream placeholder
  } else {
    return 'So, this is where all the color in my life ended up.';
  }
};
