// Libraries
import React, { FC, memo } from 'react';

// Components
import Character from 'components/Character';

// Expressions
import NurseAfraid from './expressions/Afraid';
import NurseAnnoyed from './expressions/Annoyed';
import NurseBlush from './expressions/Blush';
import NurseConcerned from './expressions/Concerned';
import NurseNeutral from './expressions/Neutral';
import NurseSad from './expressions/Sad';
import NurseSmile from './expressions/Smile';
import NurseSurprised from './expressions/Surprised';
import NurseThinking from './expressions/Thinking';

export const Nurse: FC = () => {
  return (
    <Character
      id="nurse"
      expressions={{
        afraid: <NurseAfraid />,
        annoyed: <NurseAnnoyed />,
        blush: <NurseBlush />,
        concerned: <NurseConcerned />,
        neutral: <NurseNeutral />,
        sad: <NurseSad />,
        smile: <NurseSmile />,
        surprised: <NurseSurprised />,
        thinking: <NurseThinking />,
      }}
    />
  );
};

export default memo(Nurse);
