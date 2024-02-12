// Actions
import { text, goto, pause } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const dayOneTakeTwoSchoolDoor = function* (): Sequence {

  yield text(
    'Through the Gates of Hell... as I make my way to the homeroom... through the normie lines...'
  );
  yield goto({ scene: 'school_ground_floor', sceneTitle: 'Entrance Hall' });
  
  yield pause(500);

  yield text(
    'Ah, the smell of artificial lemons and misery. Nostalgia, stress, and terror brewing in an all-too-familiar concoction of emotions.'
  );
  yield text(
    "There's little in this place to cherish... apart from the girls running up and down the stairs."
  );
  yield text(
    "Red lips pouting. Eyes crackling with determination. Struggling against gravity in a battle they can't win."
  );
  yield text(
    'Some girls lose it harder than others. And those are the milkshakes that bring all the boys to the yard.'
  );
  yield text(
    'Or at least a charity show of bouncy delight for the wretched and deprived.'
  );
  yield text('...');
  yield text('Better get to the homeroom before they close the door.');
};
