// Libraries
import React, { FC, memo } from 'react';

// Components
import Character from 'components/Character';

// Expressions
import JacklynAngry from './expressions/Angry';
import JacklynNeutral from './expressions/Neutral';
import JacklynSmile from './expressions/Smile';
import JacklynThinking from './expressions/Thinking';
import JacklynAnnoyed from './expressions/Annoyed';
import JacklynCringe from './expressions/Cringe';
import JacklynExcited from './expressions/Excited';
import JacklynLaughing from './expressions/Laughing';
import JacklynPose01 from './expressions/jacklynpose01';

export const Jacklyn: FC = () => {
  return (
    <Character
      id="jacklyn"
      expressions={{
        angry: <JacklynAngry />,
        neutral: <JacklynNeutral />,
        smile: <JacklynSmile />,
        thinking: <JacklynThinking />,
        annoyed: <JacklynAnnoyed />,
        cringe: <JacklynCringe />,
        excited: <JacklynExcited />,
        laughing: <JacklynLaughing />,
        jacklynpose01: <JacklynPose01 />,
        '': <JacklynPose01 />,
        afraid: <JacklynPose01 />,
        blush: <JacklynPose01 />,
        concerned: <JacklynPose01 />,
        confident: <JacklynPose01 />,
      }}
    />
  );
};

export default memo(Jacklyn);
