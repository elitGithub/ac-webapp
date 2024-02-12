// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { choices, text } from 'state/actions';

export const interact = function* (): Sequence {
  const choice = yield choices('middle', [
    { id: 'sign', label: 'Sign up for gym focus classes' },
    { id: 'sike', label: "I'd rather take a fall down a flight of stairs" },
  ]);

  switch (choice) {
    case 'sign':
      if (false) {
        /* TODO: quest.isabelle_tour["gym_signed"] */
        yield text('Where\'s the "I-changed-my-mind list?"');

        yield text("The only upside of this is that I can't sign up twice.");
      } else {
        yield text(
          "This is probably one of the dumbest things I've ever done, but girls dig muscles, so..."
        );

        /* yield qset({
          quest: 'isabelle_tour',
          gym_signed: true,
        }); */
      }
      break;
    case 'sike':
      if (false) {
        /* TODO: quest.isabelle_tour["gym_signed"] */
        yield text('I already signed my life away...');
      } else {
        /* pass */
      }
      break;
  }
};
