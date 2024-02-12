// Libraries
import React, { FC, memo } from 'react';
import Character from 'components/Character';
// Expressions
import MrsLAfraid from './expressions/Afraid';
import MrsLAngry from './expressions/Angry';
import MrsLAnnoyed from './expressions/Annoyed';
import MrsLBlush from './expressions/Blush';
import MrsLConcerned from './expressions/Concerned';
import MrsLConfident from './expressions/Confident';
import MrsLCringe from './expressions/Cringe';
import MrsLEmbarrassed from './expressions/Embarrassed';
import MrsLExcited from './expressions/Excited';
import MrsLEyeroll from './expressions/Eyeroll';
import MrsLFlirty from './expressions/Flirty';
import MrsLLaughing from './expressions/Laughing';
import MrsLNeutral from './expressions/Neutral';
import MrsLSad from './expressions/Sad';
import MrsLSarcastic from './expressions/Sarcastic';
import MrsLSkeptical from './expressions/Skeptical';
import MrsLSmile from './expressions/Smile';
import MrsLSurprised from './expressions/Surprised';
import MrsLThinking from './expressions/Thinking';

export const MrsL: FC = () => {
  return (
    <Character
      id="mrsl"
      expressions={{
        confident: <MrsLConfident />,
        cringe: <MrsLCringe />,
        flirty: <MrsLFlirty />,
        laughing: <MrsLLaughing />,
        afraid: <MrsLAfraid />,
        annoyed: <MrsLAnnoyed />,
        concerned: <MrsLConcerned />,
        excited: <MrsLExcited />,
        embarrassed: <MrsLEmbarrassed />,
        surprised: <MrsLSurprised />,
        thinking: <MrsLThinking />,
        skeptical: <MrsLSkeptical />,
        neutral: <MrsLNeutral />,
        eyeroll: <MrsLEyeroll />,
        angry: <MrsLAngry />,
        blush: <MrsLBlush />,
        sad: <MrsLSad />,
        sarcastic: <MrsLSarcastic />,
        smile: <MrsLSmile />,
      }}
    />
  );
};

export default memo(MrsL);
