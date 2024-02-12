// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { choices, openPhone, text, togglePhone } from 'state/actions';
import { useAppDispatch } from 'state/hooks';

export const introStart = function* (): Sequence {

    yield text("Newfall is the perfect town, but if you think you can have any of it, you're an idiot.");
    yield text("Not the girls with sun-kissed legs, rollerblading down the streets.");
    yield text("Not the million-dollar yachts, bobbing lazily in the bright-blue harbor.");
    yield text("Not the cheerful laughter of the families, picnicking in the park.");
    yield text("None of it will ever be yours.");
    yield text("And who's to blame? Society and shitty genetics?");
    yield text("To have winners, you need losers. And in life's zero-sum game... sorry, kid — snake eyes.");
    yield text("...");
    yield text("The days all bleed together in a diarrhea of misery and self-loathing.");
    yield text("Every morning, you sleep in like a bum. Get yelled at for being a disappointment.");
    yield text("You work a pointless job, earning a few pointless bucks that you spend on pointless pizzas that taste like pepperoni and ballsack.");
    yield text("Every night, you eat alone, trying not to cry.");
    yield text("And then you cry. What else is there?");

    // add a playsound here
    yield text("Train-smashed tomato sauce is the only way out... but not if you're a pussy.");
    yield text("...");
    yield text("Growing up, you expect life to be a fairytale.");
    yield text("You'll make it through school, get a good job, meet the girl of your dreams.");
    yield text("That's what you tell yourself as you stuff your promposal into the garbage because you're too much of a wimp to ask.");
    yield text("There's more fish in the sea. More opportunities.");
    yield text("That's what goes through your head as you stay home and play video games instead of going to that party...");
    yield text("There's always another chance!");
    yield text("...");
    yield text("Then you're suddenly halfway to thirty, and your Cinderella story has turned to ash.");
    yield text("You're forced to bite life's poisoned apple and realize that you have nothing. You're nobody.");
    yield text("You're all alone.");
    yield text("All your friends have long since moved on, and the only girl who wants to talk to you is called Alexa.");
    yield text("All those chances you thought you had — gone.");
    yield text("You're stuck in a pool with no ladder, hoping you drown before...");
    yield text("Before life hooks its marionette strings into your flesh once more, and you pray that one of them will catch your neck in a tight noose.");
    yield text("...");
    yield openPhone('messages');

    const response = yield choices('right', [
        {
          id: 'picasso',
          label: '"I\'d like to find my inner Picasso."',
        },
        {
          id: 'wrong',
          label:
            '"I just did it to prove you wrong. I don\'t really care for art."',
        },
      ]);
    
    switch (response) {
        case 'picasso':
            yield text("Picasso")
            break;
        case 'wrong':
            yield text("wrong")
            break;
        
        default:
            break;
    }

};
