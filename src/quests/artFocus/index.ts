import { useContext, useEffect } from 'react';
import { TimeContext } from 'components/TimeContext';
import { SingleQuest } from 'state/features/quest';
import { useAppDispatch } from 'state/hooks';
import { qset } from 'state/actions';

export const useArtFocus = (quest: SingleQuest) => {
  useEffect(() => {
    switch (quest.phase) {
    }
  }, [quest.phase]);
};

export * from './artFocusStart';
export * from './artFocusShowJacklyn';
//jacklyn_contact_second_chance has not been moved over yet, since there's no phone contacts anyways.
