import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharactersState } from '../character';

interface SetPayloadHomeBedroom extends Partial<SceneState['home_bedroom']> {
  scene: 'home_bedroom';
}

interface SetPayloadHomeHall extends Partial<SceneState['home_hall']> {
  scene: 'home_hall';
}

interface SetPayloadSchoolHomeroom
  extends Partial<SceneState['school_homeroom']> {
  scene: 'school_homeroom';
}


interface SetPayloadHomeKitchen extends Partial<SceneState['home_kitchen']> {
  scene: 'home_kitchen';
}

interface SetPayloadSchoolEntrance
  extends Partial<SceneState['school_entrance']> {
  scene: 'school_entrance';
}

interface SetPayloadSchoolForestGlade
  extends Partial<SceneState['school_forest_glade']> {
  scene: 'school_forest_glade';
}

interface SetPayloadSchoolGroundFloor
  extends Partial<SceneState['school_ground_floor']> {
  scene: 'school_ground_floor';
}

interface SetPayloadSchoolFirstHall
  extends Partial<SceneState['school_first_hall']> {
  scene: 'school_first_hall';
}

interface SetPayloadSchoolFirstHallWest
  extends Partial<SceneState['school_first_hall_west']> {
  scene: 'school_first_hall_west';
}

interface SetPayloadSchoolFirstHall
  extends Partial<SceneState['school_first_hall']> {
  scene: 'school_first_hall';
}

interface SetPayloadSchoolGroundFloorWest
  extends Partial<SceneState['school_ground_floor_west']> {
  scene: 'school_ground_floor_west';
}

interface SetPayloadSchoolNurseRoom
  extends Partial<SceneState['school_nurse_room']> {
  scene: 'school_nurse_room';
}

interface SetPayloadSchoolFirstHallEast
  extends Partial<SceneState['school_first_hall_east']> {
  scene: 'school_first_hall_east';
}

interface SetPayloadSchoolArtClass
  extends Partial<SceneState['school_art_class']> {
  scene: 'school_art_class';
}

interface SetPayloadSchoolGym extends Partial<SceneState['school_gym']> {
  scene: 'school_gym';
}

type SetPayload =
  | SetPayloadHomeBedroom
  | ((state: SceneState) => SetPayloadHomeBedroom)
  | SetPayloadHomeHall
  | ((state: SceneState) => SetPayloadHomeHall)
  | SetPayloadHomeKitchen
  | ((state: SceneState) => SetPayloadHomeKitchen)
  | SetPayloadSchoolEntrance
  | ((state: SceneState) => SetPayloadSchoolEntrance)
  | SetPayloadSchoolForestGlade
  | ((state: SceneState) => SetPayloadSchoolForestGlade)
  | SetPayloadSchoolFirstHall
  | ((state: SceneState) => SetPayloadSchoolFirstHall)
  | SetPayloadSchoolFirstHallWest
  | ((state: SceneState) => SetPayloadSchoolFirstHallWest)
  | SetPayloadSchoolFirstHall
  | ((state: SceneState) => SetPayloadSchoolFirstHall)
  | SetPayloadSchoolGroundFloor
  | ((state: SceneState) => SetPayloadSchoolGroundFloor)
  | SetPayloadSchoolGroundFloorWest
  | ((state: SceneState) => SetPayloadSchoolGroundFloorWest)
  | SetPayloadSchoolNurseRoom
  | ((state: SceneState) => SetPayloadSchoolNurseRoom)
  | SetPayloadSchoolArtClass
  | ((state: SceneState) => SetPayloadSchoolArtClass)
  | SetPayloadSchoolFirstHallEast
  | ((state: SceneState) => SetPayloadSchoolFirstHallEast)
  | SetPayloadSchoolGym
  | ((state: SceneState) => SetPayloadSchoolGym)
  | SetPayloadSchoolHomeroom
  | ((state: SceneState) => SetPayloadSchoolHomeroom)
  ;

export interface SceneState {
  home_bedroom: {
    alarm?: 'beeping' | 'smashed' | 'smashed_again' | 'off';
    controller?: 'interacted' | 'taken';
    alarm_smash_combo?: number;
  };
  home_hall: {
    umbrella_interacted?: boolean;
    umbrella_taken?: boolean;
  };
  home_kitchen: {
    gigglypuff_interacted?: boolean;
  };
  school_entrance: {};
  school_forest_glade: {
    exclusive?: keyof CharactersState;
    farm?: 'dry' | 'wet';
    got_plow?: boolean;
  };
  school_ground_floor: {};
  school_homeroom: {};
  school_first_hall: {};
  school_first_hall_west: {
    music_score?: 'chopin' | '';
    exclusive?: boolean;
    plant_taken?: boolean;
    dollar1_taken_today?: boolean;
    dollar2_taken_today?: boolean;
    dollar3_taken_today?: boolean;
    dollar1_spawned_today?: boolean;
    dollar2_spawned_today?: boolean;
    dollar3_spawned_today?: boolean;
    candy9_taken?: boolean;
    candy8_taken?: boolean;
    candy7_taken?: boolean;
    candy6_taken?: boolean;
    candy5_taken?: boolean;
    candy4_taken?: boolean;
    candy3_taken?: boolean;
    candy2_taken?: boolean;
    candy1_taken?: boolean;
    magnet?: boolean;
    book_taken?: boolean;
    tuning_hammer?: boolean;
    tuning_fork?: boolean;
  };
  school_ground_floor_west: {};
  school_nurse_room: {
    curtain?: 'open' | 'closed';
  };
  school_first_hall_east: {
    book_taken?: boolean;
    dollar1_spawned_today?: boolean;
    dollar1_taken_today?: boolean;
    dollar2_spawned_today?: boolean;
    dollar2_taken_today?: boolean;
    dollar3_spawned_today?: boolean;
    dollar3_taken_today?: boolean;
    shoe1_moved?: boolean;
    shoe2_moved?: boolean;
    shoe3_moved?: boolean;
    shoe4_moved?: boolean;
    shoe5_moved?: boolean;
    shoe6_moved?: boolean;
    shoe7_moved?: boolean;
    shoe8_moved?: boolean;
    shoe9_moved?: boolean;
    shoe10_moved?: boolean;
    shoe11_moved?: boolean;
    pile_of_shoes?: number;
    vent_ajar?: boolean;
  };
  school_art_class: {
    exclusive?: keyof CharactersState;
    dollar1_taken_today?: boolean;
    dollar2_taken_today?: boolean;
    dollar3_taken_today?: boolean;
    dollar1_spawned_today?: boolean;
    dollar2_spawned_today?: boolean;
    dollar3_spawned_today?: boolean;
    candy7_taken?: boolean;
    candy6_taken?: boolean;
    candy5_taken?: boolean;
    candy3_taken?: boolean;
    candy1_taken?: boolean;
    easel_paint_buckets?: boolean;
    brush_taken?: boolean;
    discarded_art_3_taken?: boolean;
    discarded_art_2_taken?: boolean;
    discarded_art_1_taken?: boolean;
    chair2_moved?: boolean;
    book_taken?: boolean;
    visited_today?: boolean;
    wooden_ship_interacted?: boolean;
    stick_interacted?: boolean;
  };
  school_gym: {
    ladder_taken?: boolean;
    ball_3_hidden?: boolean;
    ball_7_shown?: boolean | 'six_pointer';
    light_smashed?: boolean;
    dollar1_spawned_today?: boolean;
    dollar1_taken_today?: boolean;
    dollar2_spawned_today?: boolean;
    dollar2_taken_today?: boolean;
    book_taken?: boolean;
    magnet?: boolean;
  };
}

export const initialState: SceneState = {
  home_bedroom: {
    alarm: 'beeping',
  },
  home_hall: {},
  home_kitchen: {},
  school_entrance: {},
  school_forest_glade: { farm: 'wet' },
  school_ground_floor: {},
  school_homeroom: {},
  school_first_hall_west: {
    music_score: '',
    exclusive: false,
    plant_taken: false,
    candy9_taken: true,
    candy8_taken: true,
    candy7_taken: true,
    candy6_taken: true,
    candy5_taken: true,
    candy4_taken: true,
    candy3_taken: true,
    candy2_taken: true,
    candy1_taken: true,
    magnet: false,
    book_taken: false,
    tuning_hammer: false,
    tuning_fork: false,
  },
  school_ground_floor_west: {},
  school_first_hall: {},
  school_nurse_room: { curtain: 'open' },
  school_first_hall_east: {},
  school_art_class: {
    candy7_taken: true,
    candy6_taken: true,
    candy5_taken: true,
    candy3_taken: true,
    candy1_taken: true,
    easel_paint_buckets: false,
    brush_taken: false,
    discarded_art_3_taken: false,
    discarded_art_2_taken: false,
    discarded_art_1_taken: false,
    chair2_moved: false,
    book_taken: false,
    visited_today: false,
  },
  school_gym: {},
};

const { actions, reducer } = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<SetPayload>) => {
      const { scene, ...variables } =
        typeof payload === 'function' ? payload(state) : payload;

      return {
        ...state,
        [scene]: {
          ...state[scene],
          ...variables,
        },
      };
    },
  },
});

export const { set } = actions;

export default reducer;
