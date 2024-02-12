// Libraries
import React, { memo } from 'react';

// Components
import Character from 'components/Character';

// Expressions
import IsabelleAfraid from './expressions/Afraid';
import IsabelleAngry from './expressions/Angry';
import IsabelleAnnoyed from './expressions/Annoyed';
import IsabelleBlush from './expressions/Blush';
import IsabelleConcerned from './expressions/Concerned';
import IsabelleConfident from './expressions/Confident';
import IsabelleCringe from './expressions/Cringe';
import IsabelleExcited from './expressions/Excited';
import IsabelleEyeroll from './expressions/Eyeroll';
import IsabelleFlirty from './expressions/Flirty';
import IsabelleLaughing from './expressions/Laughing';
import IsabelleNeutral from './expressions/Neutral';
import IsabelleSad from './expressions/Sad';
import IsabelleSkeptical from './expressions/Skeptical';
import IsabelleSmile from './expressions/Smile';
import IsabelleThinking from './expressions/Thinking';

export const Isabelle: React.FC = () => {
  return (
    <Character
      id="isabelle"
      expressions={{
        afraid: <IsabelleAfraid />,
        angry: <IsabelleAngry />,
        annoyed: <IsabelleAnnoyed />,
        blush: <IsabelleBlush />,
        concerned: <IsabelleConcerned />,
        confident: <IsabelleConfident />,
        cringe: <IsabelleCringe />,
        excited: <IsabelleExcited />,
        eyeroll: <IsabelleEyeroll />,
        flirty: <IsabelleFlirty />,
        laughing: <IsabelleLaughing />,
        neutral: <IsabelleNeutral />,
        sad: <IsabelleSad />,
        skeptical: <IsabelleSkeptical />,
        smile: <IsabelleSmile />,
        thinking: <IsabelleThinking />,
      }}
    />
  );
};

export default memo(Isabelle);
