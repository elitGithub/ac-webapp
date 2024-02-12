// Libraries
import React, { FC, memo } from 'react';

// Components
import Character from 'components/Character';

// Expressions
import FloraAfraid from './expressions/Afraid';
import FloraAngry from './expressions/Angry';
import FloraAnnoyed from './expressions/Annoyed';
import FloraBlush from './expressions/Blush';
import FloraConcerned from './expressions/Concerned';
import FloraConfident from './expressions/Confident';
import FloraConfused from './expressions/Confused';
import FloraCringe from './expressions/Cringe';
import FloraCrying from './expressions/Crying';
import FloraEmbarrassed from './expressions/Embarrassed';
import FloraExcited from './expressions/Excited';
import FloraEyeroll from './expressions/Eyeroll';
import FloraFlirty from './expressions/Flirty';
import FloraLaughing from './expressions/Laughing';
import FloraNeutral from './expressions/Neutral';
import FloraSad from './expressions/Sad';
import FloraSarcastic from './expressions/Sarcastic';
import FloraSkeptical from './expressions/Skeptical';
import FloraSmile from './expressions/Smile';
import FloraThinking from './expressions/Thinking';
import FloraWorried from './expressions/Worried';

export const Flora: FC = () => {
  return (
    <Character
      id="flora"
      expressions={{
        afraid: <FloraAfraid />,
        angry: <FloraAngry />,
        annoyed: <FloraAnnoyed />,
        blush: <FloraBlush />,
        concerned: <FloraConcerned />,
        confident: <FloraConfident />,
        confused: <FloraConfused />,
        cringe: <FloraCringe />,
        crying: <FloraCrying />,
        embarrassed: <FloraEmbarrassed />,
        excited: <FloraExcited />,
        eyeroll: <FloraEyeroll />,
        flirty: <FloraFlirty />,
        laughing: <FloraLaughing />,
        neutral: <FloraNeutral />,
        sad: <FloraSad />,
        sarcastic: <FloraSarcastic />,
        skeptical: <FloraSkeptical />,
        smile: <FloraSmile />,
        thinking: <FloraThinking />,
        worried: <FloraWorried />,
      }}
    />
  );
};

export default memo(Flora);
