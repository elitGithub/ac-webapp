// Libraries
import React from 'react';
import { QuestState, SingleQuest } from 'state/features/quest';
import { useAppSelector } from 'state/hooks';

// Quests
import { usePottedWeeds } from './pottedWeeds';
import { useArtFocus } from './artFocus';
import { usePoolsideStory } from './poolsideStory';

const questHooks: {
  [key in keyof QuestState]?: (isActive: SingleQuest) => void;
} = {
  potted_weeds: usePottedWeeds,
  art_focus: useArtFocus,
  poolside_story: usePoolsideStory,
};

const useQuest = (quest: keyof QuestState) => {
  const questState = useAppSelector((state) => state.quest[quest]);
  const useQuestHook = questHooks[quest];

  useQuestHook?.(questState);
};

export const useQuests = () => {
  useQuest('potted_weeds');
  useQuest('art_focus');
  useQuest('poolside_story');
};
