import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BaseQuest {
  phase: string;
  started: boolean;
  in_progress: boolean;
  ended: boolean;
  finished: boolean;
}

export interface BlowjobDreamState extends BaseQuest {}
export interface SmashOrPassState extends BaseQuest {}
export interface CookingChiliState extends BaseQuest {}
export interface PottedWeedsState extends BaseQuest {
  nurse_gave_bottle?: boolean;
  plowcow?: boolean;
  nurse_gave_love?: boolean;
  school_talk?: boolean;
  internet_search?: boolean;
  package_days?: number;
}
export interface BackToSchoolSpecialState extends BaseQuest {}
export interface PoolsideStoryState extends BaseQuest {}
export interface DayOneTakeTwoState extends BaseQuest {}
export interface LoserToTheRescueState extends BaseQuest {
  carried_lindsey?: boolean;
}
export interface ArtFocusState extends BaseQuest {
  show_jacklyn?: string;
}

interface SetPottedWeeds extends Partial<PottedWeedsState> {
  quest: 'potted_weeds';
}
interface SetPoolsideStory extends Partial<PoolsideStoryState> {
  quest: 'poolside_story';
}
interface SetDayOneTakeTwo extends Partial<DayOneTakeTwoState> {
  quest: 'dayonetaketwo';
}
interface SetLoserToTheRescue extends Partial<LoserToTheRescueState> {
  quest: 'loser_to_the_rescue';
}
interface SetPayloadArtFocus extends Partial<ArtFocusState> {
  quest: 'art_focus';
}

type SetPayload =
  | SetPottedWeeds
  | ((state: QuestState) => SetPottedWeeds)
  | SetPayloadArtFocus
  | ((state: QuestState) => SetPayloadArtFocus)
  | SetPoolsideStory
  | ((state: QuestState) => SetPoolsideStory)
  | SetLoserToTheRescue
  | ((state: QuestState) => SetLoserToTheRescue)
  | SetDayOneTakeTwo
  | ((state: QuestState) => SetDayOneTakeTwo)

export type SingleQuest =
  | BlowjobDreamState
  | SmashOrPassState
  | CookingChiliState
  | PottedWeedsState
  | BackToSchoolSpecialState
  | ArtFocusState
  | PoolsideStoryState
  | DayOneTakeTwoState
  | LoserToTheRescueState;

export interface QuestState {
  blowjob_dream: BlowjobDreamState;
  smash_or_pass: SmashOrPassState;
  cooking_chilli: CookingChiliState;
  potted_weeds: PottedWeedsState;
  back_to_school_special: BackToSchoolSpecialState;
  art_focus: ArtFocusState;
  poolside_story: PoolsideStoryState;
  dayonetaketwo: DayOneTakeTwoState;
  loser_to_the_rescue: LoserToTheRescueState;
}

const defaults = (): BaseQuest => ({
  phase: '',
  started: false,
  in_progress: false,
  ended: false,
  finished: false,
});
export const initialState: QuestState = {
  blowjob_dream: { ...defaults() },
  smash_or_pass: { ...defaults(), started: true, in_progress: true },
  cooking_chilli: { ...defaults() },
  potted_weeds: { ...defaults(), package_days: 0 },
  back_to_school_special: { ...defaults() },
  art_focus: { ...defaults() },
  poolside_story: { ...defaults() },
  dayonetaketwo: { ...defaults() },
  loser_to_the_rescue: { ...defaults() },
};

const { actions, reducer } = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    complete: (state, { payload }: PayloadAction<keyof QuestState>) => ({
      ...state,
      [payload]: {
        ...state[payload],
        started: true,
        in_progress: false,
        ended: true,
        finished: true,
      },
    }),
    start: (state, { payload }: PayloadAction<keyof QuestState>) => ({
      ...state,
      [payload]: {
        ...state[payload],
        started: true,
        in_progress: true,
      },
    }),
    qset: (state, { payload }: PayloadAction<SetPayload>) => {
      const { quest, ...fields } =
        typeof payload === 'function' ? payload(state) : payload;

      return {
        ...state,
        [quest]: {
          ...state[quest],
          ...fields,
        },
      };
    },
  },
});

export const { complete, qset, start } = actions;

export default reducer;
