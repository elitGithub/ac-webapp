// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Character from 'components/Character';

// Expressions
import JoAngry from './expressions/Angry';
import JoAfraid from './expressions/Afraid';
import JoAnnoyed from './expressions/Annoyed';
import JoBlush from './expressions/Blush';
import JoConcerned from './expressions/Concerned';
import JoConfident from './expressions/Confident';
import JoCringe from './expressions/Cringe';
import JoDispleased from './expressions/Displeased';
import JoEmbarrassed from './expressions/Embarrassed';
import JoExcited from './expressions/Excited';
import JoEyeroll from './expressions/Eyeroll';
import JoFlirty from './expressions/Flirty';
import JoLaughing from './expressions/Laughing';
import JoNeutral from './expressions/Neutral';
import JoSad from './expressions/Sad';
import JoSarcastic from './expressions/Sarcastic';
import JoSkeptical from './expressions/Skeptical';
import JoSmile from './expressions/Smile';
import JoThinking from './expressions/Thinking';
import JoWorried from './expressions/Worried';

export const Jo: FC = () => {
  return (
    <Character
      id="jo"
      expressions={{
        angry: <JoAngry />,
        afraid: <JoAfraid />,
        annoyed: <JoAnnoyed />,
        blush: <JoBlush />,
        concerned: <JoConcerned />,
        confident: <JoConfident />,
        cringe: <JoCringe />,
        displeased: <JoDispleased />,
        embarrassed: <JoEmbarrassed />,
        excited: <JoExcited />,
        eyeroll: <JoEyeroll />,
        flirty: <JoFlirty />,
        laughing: <JoLaughing />,
        neutral: <JoNeutral />,
        sad: <JoSad />,
        sarcastic: <JoSarcastic />,
        skeptical: <JoSkeptical />,
        smile: <JoSmile />,
        thinking: <JoThinking />,
        worried: <JoWorried />,
      }}
    />
  );
};

export default memo(Jo);
