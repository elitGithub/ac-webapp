import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const { lindsey_rescue } = useAppSelector((state) => ({
    lindsey_rescue: state.quest.loser_to_the_rescue,
  }));

  if (lindsey_rescue.phase === 'fetch') {
    return "Sounds like the [nurse] has another patient behind there...\n\nMaybe it would've been smart to knock?";
  }

  return 'Two kinds of people have curtains on their beds  — patients and princesses. Everyone else just has to live in complete exposure.';
};
