// Actions
import { show, text, choices, cset, hide, qset } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const mrslPoolPetition = function* (): Sequence {
  // show isabelle smile with Dissolve(.5)
  yield show('isabelle', 'smile', {
    at: 0.5,
    with: {
      dissolve: 0.5,
    },
  });

  // mc "Hey, [isabelle]!"
  yield text('Hey, [isabelle]!', 'mc');

  // isabelle smile "Hello!"
  yield text('Hello!', 'isabelle');

  // isabelle laughing "Did you see that [mrsl] looked extra excited earlier?"
  yield show('isabelle', 'laughing');
  yield text(
    'Did you see that [mrsl] looked extra excited earlier?',
    'isabelle'
  );

  // mc "Hmm... not really?"
  yield text('Hmm... not really?', 'mc');

  // isabelle concerned_left "All right, maybe it was just me, then."
  yield show('isabelle', 'concerned'); /* TODO: 'concerned_left' */
  yield text('All right, maybe it was just me, then.', 'isabelle');

  // mc "What do you think she was excited about?"
  yield text('What do you think she was excited about?', 'mc');

  // isabelle excited "Oh, I was hoping you could tell me... since you spoke to her the moment prior."
  yield show('isabelle', 'excited'); /* TODO: 'concerned_left' */
  yield text(
    'Oh, I was hoping you could tell me... since you spoke to her the moment prior.',
    'isabelle'
  );

  // mc "Hmm... no, I didn't notice it. She seemed quite sad when I left."
  yield text(
    "Hmm... no, I didn't notice it. She seemed quite sad when I left.",
    'mc'
  );

  // isabelle concerned "Sad? Why sad?"
  yield show('isabelle', 'concerned');
  yield text('Sad? Why sad?', 'isabelle');

  // show isabelle concerned at move_to(.75)
  yield show('isabelle', 'concerned', {
    at: 0.75,
  });

  // menu(side="left"):
  const choice = yield choices('left', [
    // "\"She probably saw my grades.\"":
    { id: 'grades', label: '"She probably saw my grades."' },
    // "\"Her mouth wasn't big enough.\"":
    { id: 'mouth', label: '"Her mouth wasn\'t big enough."' },
    // "\"She seems to be in trouble.\"" if quest.mrsl_HOT > "eavesdrop":
    {
      id: 'trouble',
      label: '"She seems to be in trouble."',
    } /* TODO: Display this choice only if the condition has been met */,
  ]);

  switch (choice) {
    case 'grades':
      // show isabelle concerned at move_to(.5)
      yield show('isabelle', 'concerned', {
        at: 0.5,
      });

      // mc "She probably saw my grades."
      yield text('She probably saw my grades.', 'mc');

      // isabelle thinking "Are your grades that bad?"
      yield show('isabelle', 'thinking');
      yield text('Are your grades that bad?', 'isabelle');

      // mc "They're not good, no."
      yield text("They're not good, no.", 'mc');

      // mc "I'm especially struggling with English and gym class."
      yield text("I'm especially struggling with English and gym class.", 'mc');

      // isabelle afraid "That's really not good, [mc]!"
      yield show('isabelle', 'afraid');
      yield text("That's really not good, [mc]!", 'isabelle');

      // isabelle afraid "Your grades are your future!"
      yield text('Your grades are your future!', 'isabelle');

      // "Ugh, she sounds just like [jo]..."
      yield text('Ugh, she sounds just like [jo]...');

      // mc "I was wondering if you could help me out?"
      yield text('I was wondering if you could help me out?', 'mc');

      // isabelle laughing "I'm not super good at sports myself, but English is my favorite subject!"
      yield show('isabelle', 'laughing');
      yield text(
        "I'm not super good at sports myself, but English is my favorite subject!",
        'isabelle'
      );

      // mc "I've just never been able to wrap my head around the literature."
      yield text(
        "I've just never been able to wrap my head around the literature.",
        'mc'
      );

      // isabelle confident "It can be a bit tricky sometimes, but I can definitely help."
      yield show('isabelle', 'confident');
      yield text(
        'It can be a bit tricky sometimes, but I can definitely help.',
        'isabelle'
      );

      // mc "That would be nice of you."
      yield text('That would be nice of you.', 'mc');

      // $isabelle.love+=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        love: isabelle.love + 1,
      }));

      // $mc.intellect+=1
      yield cset(({ mc }) => ({
        character: 'mc',
        intellect: mc.intellect + 1,
      }));

      // isabelle laughing "Okay, I'll give you some tips and book recs later!"
      yield show('isabelle', 'laughing');
      yield text(
        "Okay, I'll give you some tips and book recs later!",
        'isabelle'
      );
      break;
    case 'mouth':
      // show isabelle concerned at move_to(.5)
      yield show('isabelle', 'concerned', {
        at: 0.5,
      });

      // mc "Her mouth wasn't big enough."
      yield text("Her mouth wasn't big enough.", 'mc');

      // isabelle skeptical "Big enough for what?"
      yield show('isabelle', 'skeptical');
      yield text('Big enough for what?', 'isabelle');

      // mc "For my dic...tionary. She couldn't fit in the big words."
      yield text(
        "For my dic...tionary. She couldn't fit in the big words.",
        'mc'
      );

      // isabelle thinking "I feel like you've used that joke before."
      yield show('isabelle', 'thinking');
      yield text("I feel like you've used that joke before.", 'isabelle');

      // mc "Nope. Definitely the first time."
      yield text('Nope. Definitely the first time.', 'mc');

      // $isabelle.love-=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        love: isabelle.love - 1,
      }));

      // isabelle cringe "Bit inappropriate, innit?"
      yield show('isabelle', 'cringe');
      yield text('Bit inappropriate, innit?', 'isabelle');

      // mc "I thought it was funny..."
      yield text('I thought it was funny...', 'mc');

      // isabelle eyeroll "Agree to disagree."
      yield show('isabelle', 'eyeroll');
      yield text('Agree to disagree.', 'isabelle');

      // "Yikes. I really need to update my joke supply, 'cause that shit's running low."
      yield text(
        "Yikes. I really need to update my joke supply, 'cause that shit's running low."
      );

      // isabelle smile "So, was she actually sad?"
      yield show('isabelle', 'smile');
      yield text('So, was she actually sad?', 'isabelle');

      // mc "I don't know. I have a hard time reading her."
      yield text("I don't know. I have a hard time reading her.", 'mc');

      // isabelle laughing "Fair."
      yield show('isabelle', 'laughing');
      yield text('Fair.', 'isabelle');
      break;
    case 'trouble':
      // show isabelle concerned at move_to(.5)
      yield show('isabelle', 'concerned', {
        at: 0.5,
      });

      // mc "She seems to be in trouble."
      yield text('She seems to be in trouble.', 'mc');

      // isabelle afraid "In trouble?"
      yield show('isabelle', 'afraid');
      yield text('In trouble?', 'isabelle');

      // mc "Yeah. I overheard a conversation in the women's locker room earlier."
      yield text(
        "Yeah. I overheard a conversation in the women's locker room earlier.",
        'mc'
      );

      // mc "Someone really told her off. And there was something about a deal."
      yield text(
        'Someone really told her off. And there was something about a deal.',
        'mc'
      );

      // isabelle thinking "Who?"
      yield show('isabelle', 'thinking');
      yield text('Who?', 'isabelle');

      // mc "I don't know. The voices were pretty muted."
      yield text("I don't know. The voices were pretty muted.", 'mc');

      // isabelle thinking "What kind of deal?"
      yield text('What kind of deal?', 'isabelle');

      // mc "I think it was something about me..."
      yield text('I think it was something about me...', 'mc');

      // isabelle afraid "About you? Are you sure?"
      yield show('isabelle', 'afraid');
      yield text('About you? Are you sure?', 'isabelle');

      // mc "I think the other person accused [mrsl] of being flirtatious with me."
      yield text(
        'I think the other person accused [mrsl] of being flirtatious with me.',
        'mc'
      );

      // isabelle cringe "That's really inappropriate."
      yield show('isabelle', 'cringe');
      yield text("That's really inappropriate.", 'isabelle');

      // isabelle cringe "Have you felt that's the case?"
      yield text("Have you felt that's the case?", 'isabelle');

      // mc "Hmm... maybe? Probably more than last time around."
      yield text('Hmm... maybe? Probably more than last time around.', 'mc');

      // isabelle concerned "Last time around?"
      yield show('isabelle', 'concerned');
      yield text('Last time around?', 'isabelle');

      // mc "Last year, I mean."
      yield text('Last year, I mean.', 'mc');

      // isabelle skeptical "Mhm..."
      yield show('isabelle', 'skeptical');
      yield text('Mhm...', 'isabelle');

      // isabelle neutral "Do you reckon it was the principal?"
      yield show('isabelle', 'neutral');
      yield text('Do you reckon it was the principal?', 'isabelle');

      // mc "No, it wasn't. I'd definitely recognize [jo]'s voice even if muted."
      yield text(
        "No, it wasn't. I'd definitely recognize [jo]'s voice even if muted.",
        'mc'
      );

      // isabelle concerned_left "Maybe you just misunderstood the situation."
      yield show('isabelle', 'concerned'); /* TODO: 'concerned_left' */
      yield text('Maybe you just misunderstood the situation.', 'isabelle');

      // isabelle concerned_left "Eavesdropping isn't exactly reliable all of the time."
      yield text(
        "Eavesdropping isn't exactly reliable all of the time.",
        'isabelle'
      );

      // mc "I'm not sure..."
      yield text("I'm not sure...", 'mc');

      // isabelle excited "Maybe you should report it to the principal?"
      yield show('isabelle', 'excited');
      yield text('Maybe you should report it to the principal?', 'isabelle');

      // "Knowing [jo], I'd just get in trouble somehow."
      yield text("Knowing [jo], I'd just get in trouble somehow.");

      // mc "Hmm... maybe later."
      yield text('Hmm... maybe later.', 'mc');
      break;
  }

  // isabelle smile "So, what have you been up to today?"
  yield show('isabelle', 'smile');
  yield text('So, what have you been up to today?', 'isabelle');

  // mc "I'm actually trying to write a petition to open the pool early."
  yield text(
    "I'm actually trying to write a petition to open the pool early.",
    'mc'
  );

  // isabelle thinking "I did hear that it was closed the first week..."
  yield show('isabelle', 'thinking');
  yield text('I did hear that it was closed the first week...', 'isabelle');

  // mc "It's actually closed longer than that this year. Up until after the Newfall Independence Day."
  yield text(
    "It's actually closed longer than that this year. Up until after the Newfall Independence Day.",
    'mc'
  );

  // mc "No one will have the chance to try out for the swim team before the season starts."
  yield text(
    'No one will have the chance to try out for the swim team before the season starts.',
    'mc'
  );

  // mc "Freshmen will be robbed of their chance to get a good start on the team."
  yield text(
    'Freshmen will be robbed of their chance to get a good start on the team.',
    'mc'
  );

  // isabelle cringe "Right. That is a proper mistake by the administration."
  yield show('isabelle', 'cringe');
  yield text(
    'Right. That is a proper mistake by the administration.',
    'isabelle'
  );

  // mc "Think you can help me out?"
  yield text('Think you can help me out?', 'mc');

  // isabelle confident "Absolutely can."
  yield show('isabelle', 'confident');
  yield text('Absolutely can.', 'isabelle');

  // isabelle confident "But the festivities are right around the corner, and I promised [mrsl] to help decorate."
  yield text(
    'But the festivities are right around the corner, and I promised [mrsl] to help decorate.',
    'isabelle'
  );

  // isabelle laughing "Maybe we can help each other?"
  yield show('isabelle', 'laughing');
  yield text('Maybe we can help each other?', 'isabelle');

  // "[isabelle] has been here for a few weeks and she's already doing more for the school than I did in four full years..."
  yield text(
    "[isabelle] has been here for a few weeks and she's already doing more for the school than I did in four full years..."
  );

  // "Maybe it's time to step up my game."
  yield text("Maybe it's time to step up my game.");

  // mc "I guess that sounds fair."
  yield text('I guess that sounds fair.', 'mc');

  // isabelle excited "Right! We'll need confetti and decorations."
  yield show('isabelle', 'excited');
  yield text("Right! We'll need confetti and decorations.", 'isabelle');

  // isabelle excited "Take care of that for me and I'll handle the petition."
  yield text(
    "Take care of that for me and I'll handle the petition.",
    'isabelle'
  );

  // "Great. Once again in charge of the confetti."
  yield text('Great. Once again in charge of the confetti.');

  // "She has no idea that I'm known as the pool clogger."
  yield text("She has no idea that I'm known as the pool clogger.");

  // mc "Confetti and decorations. Got it."
  yield text('Confetti and decorations. Got it.', 'mc');

  // hide isabelle with Dissolve(.5)
  yield hide('isabelle', {
    with: {
      dissolve: 0.5,
    },
  });

  // "The logical place to start would be the art classroom."
  yield text('The logical place to start would be the art classroom.');

  // $quest.poolside_story.advance("confetti")
  yield qset({
    quest: 'poolside_story',
    phase: 'confetti',
  });
};
