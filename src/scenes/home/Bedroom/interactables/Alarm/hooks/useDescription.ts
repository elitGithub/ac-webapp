import { useAppSelector } from 'state/hooks';

export const useDescription = (): string => {
  const { alarm, smash_or_pass } = useAppSelector((state) => ({
    alarm: state.scene.home_bedroom.alarm,
    smash_or_pass: state.quest.smash_or_pass,
  }));

  if (smash_or_pass.ended) {
    if (alarm === 'smashed')
      return "I should've sent this vile machine to the shadow realm ages ago. At least, it won't bother me again.";
    else return 'Finally, some peace and quiet. More sleep!';
  }

  return '*BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP!*';
};
