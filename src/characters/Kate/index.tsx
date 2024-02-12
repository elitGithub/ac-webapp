// Libraries
import React from 'react';

// Components
import Character from 'components/Character';

// Expressions
import KateFlirty from './expressions/Flirty';
import KateAfraid from './expressions/Afraid';
import KateAngry from './expressions/Angry';
import KateAnnoyed from './expressions/Annoyed';
import KateBlush from './expressions/Blush';
import KateConfident from './expressions/Confident';
import KateCringe from './expressions/Cringe';
import KateEmbarrassed from './expressions/Embarrassed';
import KateExcited from './expressions/Excited';
import KateEyeroll from './expressions/Eyeroll';
import KateGushing from './expressions/Gushing';
import KateLaughing from './expressions/Laughing';
import KateNeutral from './expressions/Neutral';
import KateSad from './expressions/Sad';
import KateSkeptical from './expressions/Skeptical';
import KateSmile from './expressions/Smile';
import KateSurprised from './expressions/Surprised';
import KateThinking from './expressions/Thinking';
import KateAngel from './expressions/Angel';

export const Kate: React.FC = () => {
  return (
    <Character
      id="kate"
      expressions={{
        flirty: <KateFlirty />,
        afraid: <KateAfraid />,
        angry: <KateAngry />,
        annoyed: <KateAnnoyed />,
        blush: <KateBlush />,
        confident: <KateConfident />,
        cringe: <KateCringe />,
        embarrassed: <KateEmbarrassed />,
        excited: <KateExcited />,
        eyeroll: <KateEyeroll />,
        gushing: <KateGushing />,
        laughing: <KateLaughing />,
        neutral: <KateNeutral />,
        sad: <KateSad />,
        skeptical: <KateSkeptical />,
        smile: <KateSmile />,
        surprised: <KateSurprised />,
        thinking: <KateThinking />,
        angel: <KateAngel />
      }}
    />
  );
};

export default Kate;
