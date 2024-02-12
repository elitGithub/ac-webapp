// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { get, text, show, hide } from 'state/actions';

export const interact = function* (): Sequence {
  const jacklynatartclass = yield get(
    (state) => state.character.jacklyn.location === 'school_art_class'
  );
  yield text('Red plus blue equals purple...');
  yield text('Blue plus yellow equals green...');
  if (jacklynatartclass) {
    //TODO: this seems to show true no matter what TOD or if jacklyn is visible
    yield show('jacklyn', 'annoyed', {
      flip: false,
      at: 0.25,
      with: {
        appearFrom: 'left',
      },
    });

    yield text('What are you doing over there?', 'jacklyn');
    yield text('Um... just... art stuff.', 'mc');
    yield text('Shit. Better get out of here quickly.');

    yield hide('jacklyn');
  }
};
