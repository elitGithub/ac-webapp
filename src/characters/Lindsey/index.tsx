// Libraries
import React from 'react';

// Components
import Character from 'components/Character';

// Expressions
import LindseyAngry from './expressions/Angry';
import LindseyConfident from './expressions/Confident';
import LindseyExcited from './expressions/Excited';
import LindseyNeutral from './expressions/Neutral';
import LindseyFlirty from './expressions/Flirty';
import LindseyLaughing from './expressions/Laughing';
import LindseySkeptical from './expressions/Skeptical';
import LindseySmile from './expressions/Smile';
import LindseyAfraid from './expressions/Afraid';
import LindseyBlush from './expressions/Blush';
import LindseyCringe from './expressions/Cringe';
import LindseyThinking from './expressions/Thinking';
import LindseyAnnoyed from './expressions/Annoyed';
import LindseyConcerned from './expressions/Concerned';
import LindseyEyeroll from './expressions/Eyeroll';
import LindseySad from './expressions/Sad';

export const Lindsey: React.FC = () => {
  return (
    <Character
      id="lindsey"
      expressions={{
        angry: <LindseyAngry />,
        confident: <LindseyConfident />,
        excited: <LindseyExcited />,
        neutral: <LindseyNeutral />,
        flirty: <LindseyFlirty />,
        laughing: <LindseyLaughing />,
        skeptical: <LindseySkeptical />,
        smile: <LindseySmile />,
        afraid: <LindseyAfraid />,
        blush: <LindseyBlush />,
        cringe: <LindseyCringe />,
        thinking: <LindseyThinking />,
        annoyed: <LindseyAnnoyed />,
        concerned: <LindseyConcerned />,
        eyeroll: <LindseyEyeroll />,
        sad: <LindseySad />,
      }}
    />
  );
};

export default Lindsey;
