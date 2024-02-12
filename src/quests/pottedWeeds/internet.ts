// Sequence: internet
import { Sequence } from 'components/SequenceContext';

import { choices, cset, get, qset, text } from 'state/actions';

// label jo_quest_potted_internet
export const internet = function* (): Sequence {
  const internet_search = yield get(
    (state) => state.quest.potted_weeds.internet_search
  );

  if (!internet_search) {
    // "Surely, [flora] must've found her cure on the internet last time."
    yield text(
      "Surely, Flora must've found her cure on the internet last time."
    );

    // "Okay, Google. Let's see what you got."
    yield text("Okay, Google. Let's see what you got.");

    // "{i}Miracle... cures... that... fix... throat... pain...{/}"
    yield text('*Miracle... cures... that... fix... throat... pain...*');

    // "Hmm... lots of results here..."
    yield text('Hmm... lots of results here...');

    // "{i}\"Magic Jackson's easy tricks to fix your throat pain. The doctors hate him!\"{/}"
    yield text(
      "*Magic Jackson's easy tricks to fix your throat pain. The doctors hate him!*"
    );

    // "{i}\"Got something stuck in your throat? Try eating rocks.\"{/}"
    yield text('*Got something stuck in your throat? Try eating rocks.*');

    // "{i}\"Avoid throat pain by becoming a lesbian today. Hot singles in your area!\"{/}"
    yield text(
      '*Avoid throat pain by becoming a lesbian today. Hot singles in your area!*'
    );

    // "Hmm... the results are all pretty useless. Well, the rock one was nice. I'll keep some in my pocket from now on."
    yield text(
      "Hmm... the results are all pretty useless. Well, the rock one was nice. I'll keep some in my pocket from now on."
    );

    // "..."
    yield text('...');

    // "Should probably try the dark web instead..."
    yield text('Should probably try the dark web instead...');

    // "One of the drug sites should have something."
    yield text('One of the drug sites should have something.');

    // "..."
    yield text('...');

    // "Crystal meth lollipops? Hmm... no. [jo] hates lollipops."
    yield text('Crystal meth lollipops? Hmm... no. Jo hates lollipops.');

    // "Mexican cocaine doughnuts? The [guard] would probably be into that, but [jo] is very careful about her figure."
    yield text(
      'Mexican cocaine doughnuts? The guard would probably be into that, but Jo is very careful about her figure.'
    );

    // "What's this? Gigglypuff seeds?"
    yield text("What's this? Gigglypuff seeds?");

    // "{i}\"Swallowed too much dick? Like a lullaby for your pain and ailments!\"{/}"
    yield text(
      '*"Swallowed too much dick? Like a lullaby for your pain and ailments!"*'
    );

    // "{i}\"Grow it yourself. Stronger than pot. More relaxing than tranquilizers.\"{/}"
    yield text(
      '*"Grow it yourself. Stronger than pot. More relaxing than tranquilizers."*'
    );

    // "This sounds like the stuff I need."
    yield text('This sounds like the stuff I need.');

    // $quest.jo_potted["internet_search"] = True
    yield qset({
      quest: 'potted_weeds',
      internet_search: true,
    });
  } else {
    yield text('Gigglypuff seeds sound like the stuff I need.');
  }

  const choice = yield choices('middle', [
    {
      id: 'buy',
      label: 'Buy gigglypuff seeds',
      icon: 'assets/ui/icon_money.webp',
      iconValue: (state) => `${Math.min(state.character.mc.money ?? 0, 69)}/69`,
      condition: (state) => state.character.mc.money >= 69,
    },
    {
      id: 'later',
      label: 'Not now',
    },
  ]);

  if (choice === 'buy') {
    console.log('buy');
    yield cset(({ mc }) => ({
      character: 'mc',
      money: mc.money - 69,
    }));

    // "Can't really buy common drugs in case [flora] or [jo] opens the package."
    yield text(
      "Can't really buy common drugs in case Flora or Jo opens the package."
    );

    // "These seeds seem inconspicuous enough."
    yield text('These seeds seem inconspicuous enough.');

    // "Should arrive within a couple of days."
    yield text('Should arrive within a couple of days.');

    yield qset({
      quest: 'potted_weeds',
      phase: 'package',
    });
  }
  console.log('not now');
};
