// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    "This is where the school's real talent is. Even in the old pictures, the women all look stunning."
  );

  yield text(
    "It's hard not to wonder what kind of bitches hide behind those fake smiles."
  );
};
