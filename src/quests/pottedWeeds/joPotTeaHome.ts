// Sequence: joPotTeaHome
import { Sequence } from 'components/SequenceContext';
import {
  addItem,
  choices,
  complete,
  cset,
  equip,
  get,
  goto,
  hide,
  moveTo,
  qset,
  removeItem,
  show,
  text,
  unequip,
} from 'state/actions';

// label quest_jo_pot_tea_home:
const joPotTeaHome = function* (): Sequence {
  // if quest.jo_potted["school_talk"]:
  const schoolTalk = yield get((state) => state.quest.potted_weeds.school_talk);
  if (schoolTalk) {
    // show jo flirty with Dissolve(.5)
    yield show('jo', 'flirty', {
      with: {
        dissolve: 0.5,
      },
    });

    // jo flirty "That smells nice! Is that the tea you made me?"
    yield text('That smells nice! Is that the tea you made me?', 'jo');

    // mc  "Yeah, are you interested in a cup?"
    yield text('Yeah, are you interested in a cup?', 'mc');
  } else {
    // show jo confident with Dissolve(.5)
    yield show('jo', 'confident', {
      with: {
        dissolve: 0.5,
      },
    });

    // jo confident "What's with the smile, kiddo?"
    yield text("What's with the smile, kiddo?", 'jo');

    // mc "I've... learned to work the lands."
    yield text("I've... learned to work the lands.", 'mc');

    // jo smile "I'm glad you have!"
    yield show('jo', 'smile');
    yield text("I'm glad you have!", 'jo');

    // jo smile "Is that a metaphor for something? I'm struggling to keep up with the slang."
    yield text(
      "Is that a metaphor for something? I'm struggling to keep up with the slang.",
      'jo'
    );

    // jo eyeroll "Last night [flora] told me that her new hair dryer blows her skirt up."
    yield show('jo', 'eyeroll');
    yield text(
      'Last night Flora told me that her new hair dryer blows her skirt up.',
      'jo'
    );

    // jo sarcastic "But apparently that just means it's really good and she's excited about it."
    yield show('jo', 'sarcastic');
    yield text(
      "But apparently that just means it's really good and she's excited.",
      'jo'
    );

    // mc "Right... I'm sure that's what it means. [jacklyn]'s a bad influence on her."
    yield text(
      "Right... I'm sure that's what it means. Jacklyn's a bad influence on her.",
      'mc'
    );

    // mc "Anyway, I meant I've gotten into agriculture."
    yield text("Anyway, I meant I've gotten into agriculture.", 'mc');

    // jo smile "That is great news! I'm glad you're finally interested in something other than your computer and cartoons."
    yield show('jo', 'smile');
    yield text(
      "That is great news! I'm glad you're finally interested in something other than your computer and cartoons.",
      'jo'
    );

    // mc "I actually grew some plants and I've made tea from their leaves. It's supposed to help with throat pain!"
    yield text(
      "I actually grew some plants and I've made tea from their leaves. It's supposed to help with throat pain!",
      'mc'
    );

    // jo concerned "You did all that for me?"
    yield show('jo', 'concerned');
    yield text('You did all that for me?', 'jo');

    // mc "Yes, is that so hard to believe?"
    yield text('Yes, is that so hard to believe?', 'mc');

    // jo confident "Of course not. I'm really proud of you. Empathy is a sign of maturity."
    yield show('jo', 'confident');
    yield text(
      "Of course not. I'm really proud of you. Empathy is a sign of maturity.",
      'jo'
    );

    // mc "Would you like a cup?"
    yield text('Would you like a cup?', 'mc');
  }

  // jo excited "Certainly."
  // jo excited "I sure hope it helps with the pain."
  // mc "It's supposed to have all sorts of anti-inflammatory qualities."
  // mc "Also helps you relax. I know stress is what's causing the throat ache."
  // $unlock_replay("jo_pot")
  // $mc.remove_item("gigglypuff_tea")
  // jo smile_cup "I appreciate it, honey."
  yield show('jo', 'excited');
  yield text('Certainly.', 'jo');

  yield text('I sure hope it helps with the pain.', 'jo');

  yield text(
    "It's supposed to have all sorts of anti-inflammatory qualities.",
    'mc'
  );

  yield text(
    "Also helps you relax. I know stress is what's causing the throat ache.",
    'mc'
  );

  // TODO: unlock replay

  yield removeItem('mc', 'gigglypuff_tea');

  yield equip('jo', 'cup');
  yield show('jo', 'smile');
  yield text('I appreciate it, honey.', 'jo');

  // if flora.at("home_kitchen"):
  const floraAtHomeKitchen = yield get(
    (state) => state.character.flora.location === 'home_kitchen'
  );
  if (floraAtHomeKitchen) {
    // show jo smile_cup at move_to(.75)
    yield moveTo('jo', 0.75);

    // show flora annoyed flip at appear_from_left(.25)
    yield show('flora', 'annoyed', {
      flip: true,
      at: 0.25,
      with: {
        appearFrom: 'left',
      },
    });

    // flora annoyed flip "Gross. What's that smell?"
    yield text("Gross. What's that smell?", 'flora');

    // jo neutral_cup "Don't say that, [flora]."
    yield show('jo', 'neutral');
    yield text("Don't say that, Flora.", 'jo');

    // jo smile_cup "[mc] has been kind enough to brew me a cup of tea for my throat."
    yield show('jo', 'smile');
    yield text(
      '[mc] has been kind enough to brew me a cup of tea for my throat.',
      'jo'
    );

    // flora skeptical "I would check the table of contents if I were you..."
    yield show('flora', 'skeptical');
    yield text('I would check the table of contents if I were you...', 'flora');

    // mc "It's entirely organic. I grew it myself."
    yield text("It's entirely organic. I grew it myself.", 'mc');

    // mc "Would you like a cup as well?"
    yield text('Would you like a cup as well?', 'mc');

    // flora angry "No, thanks. I'll be in my room."
    yield show('flora', 'angry');
    yield text("No, thanks. I'll be in my room.", 'flora');

    // show flora angry at disappear_to_left
    yield show('flora', 'angry', {
      with: {
        disappearTo: 'left',
      },
    });

    // show jo smile_cup at move_to(.5,1)
    yield moveTo('jo', 0.5);

    // $flora.location="home_bedroom"
    yield cset({
      character: 'flora',
      location: 'home_bedroom',
    });

    // "She stomped off all upset. She'd probably made plans to cure [jo]'s throat pain herself."
    yield text(
      "She stomped off all upset. She'd probably made plans to cure Jo's throat pain herself."
    );

    // "Sucks to suck, [flora]."
    yield text('Sucks to suck, Flora.');
  }

  // jo smile_cup "Okay, let's give it a taste."
  yield text("Okay, let's give this a taste.", 'jo');

  // jo confident_cup "..."
  yield show('jo', 'confident');
  yield text('...', 'jo');

  // jo concerned_cup "What's in this?"
  yield show('jo', 'concerned');
  yield text("What's in this?", 'jo');

  // show jo concerned_cup at move_to(.25)
  yield moveTo('jo', 0.25);

  const whatsInThis = yield choices('right', [
    { id: 'leaves', label: '"Just err... tea leaves."' },
    {
      id: 'exotic',
      label:
        '"The plants are a distant relative to the Cannabis sativa plant."',
      condition: (state) => state.character.mc.intellect >= 5,
      icon: 'int',
    },
    {
      id: 'work',
      label: '"Hard work, for the most part."',
      condition: (state) => state.character.mc.strength >= 4,
      icon: 'str',
    },
  ]);

  switch (whatsInThis) {
    case 'leaves':
      // show jo concerned_cup at move_to(.5)
      yield moveTo('jo', 0.5);

      // mc "Just err... tea leaves."
      yield text('Just err... tea leaves.', 'mc');

      // jo concerned_cup "It's very potent!"
      yield text("It's very potent!", 'jo');

      // mc "Yeah, the plant is exotic. Nothing quite like it in the wild."
      yield text(
        'Yeah, the plant is exotic. Nothing quite like it in the wild.',
        'mc'
      );

      // jo confident_cup "..."
      yield show('jo', 'confident');
      yield text('...', 'jo');

      // jo smile_cup "I appreciate it, [mc]."
      yield show('jo', 'smile');
      yield text('I appreciate it, [mc].', 'jo');

      // mc "Anything to help you."
      yield text('Anything to help you.', 'mc');

      // $jo.love+=1
      yield cset((chars) => ({
        character: 'jo',
        love: chars['jo'].love + 1,
      }));

      // jo smile_cup "Aw, sweetie!"
      yield text('Aw, sweetie!', 'jo');
      break;
    case 'exotic':
      // show jo concerned_cup at move_to(.5)
      yield moveTo('jo', 0.5);

      // mc "The plants are a distant relative to the Cannabis sativa plant."
      yield text(
        'The plants are a distant relative to the Cannabis sativa plant.',
        'mc'
      );

      // jo neutral_cup "The drug?"
      yield show('jo', 'neutral');
      yield text('The drug?', 'jo');

      // mc "They don't seem related at all, kind of like me and [flora]."
      yield text(
        "They don't seem related at all, kind of like me and Flora.",
        'mc'
      );

      // jo smile_cup "I'm not upset with you! I think it's a nice gesture."
      yield show('jo', 'smile');
      yield text("I'm not upset with you! I think it's a nice gesture.", 'jo');

      // jo smile_cup "Don't tell [flora], but I used to smoke a good bit of pot when I first started as a school administrator..."
      yield text(
        "Don't tell Flora, but I used to smoke a good bit of pot when I first started as a school administrator...",
        'jo'
      );

      // jo smile_cup "It always helped with the stress and took the burn and aches out of my throat."
      yield text(
        'It always helped with the stress and took the burn and aches out of my throat.',
        'jo'
      );

      // jo confident_cup "..."
      yield show('jo', 'confident');
      yield text('...', 'jo');

      // $jo.lust+=1
      yield cset((chars) => ({
        character: 'jo',
        lust: chars['jo'].lust + 1,
      }));

      // jo smile_cup "I used to be very sore down there after those late nights at the office."
      yield text(
        'I used to be very sore down there after those late nights at the office.',
        'jo'
      );
    case 'work':
      // show jo concerned_cup at move_to(.5)
      yield moveTo('jo', 0.5);

      // mc "Hard work, for the most part."
      yield text('Hard work, for the most part.', 'mc');

      // jo smile_cup "I've noticed you getting into shape lately."
      yield show('jo', 'smile');
      yield text("I've noticed you getting into shape lately.", 'jo');

      // jo smile_cup "And I've been meaning to reward you."
      yield text("And I've been meaning to reward you.", 'jo');

      // $mc.money+=25
      yield cset((chars) => ({
        character: 'mc',
        money: chars['mc'].money + 25,
      }));

      // jo confident_cup "..."
      yield show('jo', 'confident');
      yield text('...', 'jo');

      // mc "Thanks, [jo]."
      yield text('Thanks, Jo.', 'mc');

      // jo smile_cup "I know it's not much, but if you keep this up, you can expect more of it in the future."
      yield show('jo', 'smile');
      yield text(
        "I know it's not much, but if you keep this up, you can expect more of it in the future.",
        'jo'
      );
      break;
  }

  // jo smile_cup "And the tea is very effective! My throat feels better already."
  yield show('jo', 'smile');
  yield text(
    'And the tea is very effective! My throat feels better already.',
    'jo'
  );

  // mc "Happy it works."
  yield text('Happy it works.', 'mc');

  // jo skeptical flip "Gosh, I'm already getting sleepy... it's been such a long day..."
  yield show('jo', 'skeptical', {
    flip: true,
  });
  yield text(
    "Gosh, I'm already getting sleepy... it's been such a long day...",
    'jo'
  );

  // jo skeptical flip "Thanks for the tea, honey. I think I'm going to head upstairs before I pass out on the floor. Have a good night!"
  yield text(
    "Thanks for the tea, honey. I think I'm going to head upstairs before I pass out on the floor. Have a good night!",
    'jo'
  );

  // show jo skeptical flip at disappear_to_right()
  yield hide('jo', {
    with: {
      disappearTo: 'right',
    },
  });

  // "Not sure what's going on, but that's not the way to her bedroom."
  yield text(
    "Not sure what's going on, but that's not the way to her bedroom."
  );

  // "..."
  yield text('...');

  // mc "[jo]? Are you all right?"
  yield text('Jo? Are you all right?', 'mc');

  // $jo.unequip("jo_shirt")
  yield unequip('jo', 'shirt');

  // $jo.unequip("jo_bra")
  yield unequip('jo', 'bra');

  // #$jo.unequip("jo_panties")
  yield unequip('jo', 'panties');

  // show jo thinking at appear_from_right()
  yield show('jo', 'thinking', {
    with: {
      appearFrom: 'right',
    },
  });

  // jo thinking "I'm really tired, honey. I'm going to bed now."
  yield text("I'm really tired, honey. I'm going to bed now.", 'jo');

  // mc "..."
  yield text('...', 'mc');

  // show black with Dissolve(.5)
  // show jo drugged with Dissolve(.5)
  // hide black with hpunch
  // yield goto('cutscene_jo_drugged');

  // jo "Have a good night now, I think I'm—"
  yield text("Have a good night now, I think I'm—", 'jo');

  // jo "ZzZz.... zzZz..."
  yield text('ZzZz.... zzZz...', 'jo');

  // "Seriously? That tea was a lot stronger than expected..."
  yield text('Seriously? That tea was a lot stronger than expected...');

  // jo "ZzzzZzz... [flora]... ZzZ... I love you, [flora]... zZzz..."
  yield text('ZzzzZzz... Flora... ZzZ... I love you, Flora... zZzz...', 'jo');

  // "Ugh, even in her sleep."
  yield text('Ugh, even in her sleep.');

  // mc "[jo]? This is the kitchen."
  yield text('Jo? This is the kitchen.', 'mc');

  // "She's completely knocked out."
  yield text("She's completely knocked out.");

  // "..."
  yield text('...');

  // "It would be wrong, but..."
  yield text('It would be wrong, but...');

  // "Maybe this is my only chance to see what's underneath that skirt..."
  yield text(
    "Maybe this is my only chance to see what's underneath that skirt..."
  );

  // "No one would know."
  yield text('No one would know.');

  // "..."
  yield text('...');

  // "But on the other hand, this is [jo]."
  yield text('But on the other hand, this is Jo.');

  // "It wouldn't just be illegal, it'd be morally unjust."
  yield text("It wouldn't just be illegal, it'd be morally unjust.");

  // "But it's a once in a lifetime chance..."
  yield text("But it's a once in a lifetime chance...");

  // "Maybe just a quick peek. No one would be the wiser."
  yield text('Maybe just a quick peek. No one would be the wiser.');

  // "I'm going to hell for this..."
  yield text("I'm going to hell for this...");

  // show jo drugged_sleepy with Dissolve(.5)
  yield show('jo', 'drugged_sleepy', {
    with: {
      dissolve: 0.5,
    },
  });

  // jo "zZz... zZz..."
  yield text('zZz... zZz...', 'jo');

  // jo "[mc]... ZzZ... please take better care of yourself.... zZz..."
  yield text(
    '[mc]... ZzZ... please take better care of yourself.... zZz...',
    'jo'
  );

  // "Fuck. Now I feel bad."
  yield text('Fuck. Now I feel bad.');

  // "Maybe I should carry her upstairs? She needs to sleep it off."
  yield text('Maybe I should carry her upstairs? She needs to sleep it off.');

  // "Her throat is better so my job here is technically done."
  yield text('Her throat is better so my job here is technically done.');

  // jo "zZzz... itchy... zZz... it's itchy..."
  yield text("zZzz... itchy... zZz... it's itchy...", 'jo');

  const treatment = yield choices('left', [
    { id: 'carry', label: 'Carry her upstairs' },
    { id: 'molest', label: 'Scratch her itch' },
  ]);

  switch (treatment) {
    case 'carry':
      // mc "All right, [jo]. Let's get you to bed."
      yield text("All right, Jo. Let's get you to bed.", 'mc');

      // show black with fadehold
      // TODO: Fade black

      // call goto_home_hall
      // yield goto('home_hall');

      // hide black with Dissolve(.5)
      // TODO: hide black

      // "All right, she's fast asleep in her bed now."
      yield text("All right, she's fast asleep in her bed now.");

      // "I've done some shitty things in the past, but molesting someone who's asleep is where I draw the line."
      yield text(
        "I've done some shitty things in the past, but molesting someone who's asleep is where I draw the line."
      );

      // $jo.love+=2
      yield cset((chars) => ({
        character: 'jo',
        love: chars['jo'].love + 2,
      }));

      // "[jo] might not remember, but doing the right thing shouldn't depend on if other people know."
      yield text(
        "Jo might not remember, but doing the right thing shouldn't depend on if other people know."
      );

      // $mc.love+=2
      yield cset((chars) => ({
        character: 'mc',
        love: chars['mc'].love + 2,
      }));

      // "As long as I know, it's a step in the right direction."
      yield text("As long as I know, it's a step in the right direction.");

      // "Crap. I forgot to leave the key to her room with her."
      yield text('Crap. I forgot to leave the key to her room with her.');

      // "Oh, well, I'll just give it to her when she wakes up."
      yield text("Oh, well, I'll just give it to her when she wakes up.");

      // $mc.add_item("key_jo_room")
      yield addItem('mc', 'key_jo_room');

      // $quest.jo_potted.finish()
      yield complete('potted_weeds');
      break;
  }
};
