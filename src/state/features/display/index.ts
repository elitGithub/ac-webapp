// Libraries
import { createSlice } from '@reduxjs/toolkit';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CharactersState } from '../character';
import { RootState } from 'state';

export interface ChoiceData {
  id: string;
  label: string;
  icon?: string;
  iconValue?: string | ((state: RootState) => string);
  condition?: (state: RootState) => boolean;
}

export type Effect = { type: 'vpunch' } | { type: 'hpunch' };
export type Scene =
  | 'splash_screen'
  | 'main_menu'
  | 'intro'
  | 'home_bathroom'
  | 'home_bedroom'
  | 'home_hall'
  | 'home_kitchen'
  | 'school_entrance'
  | 'school_forest_glade'
  | 'school_ground_floor'
  | 'school_first_hall_west'
  | 'school_first_hall'
  | 'school_ground_floor_west'
  | 'school_nurse_room'
  | 'school_first_hall_east'
  | 'school_art_class'
  | 'school_english_class'
  | 'school_music_class'
  | 'school_gym'
  | 'school_homeroom'
  ;

export interface CharacterConfig {
  character: string;
  expression: string;
  position: number;
}

type XRayState = 'full' | 'partial' | 'off';
export interface DisplayState {
  scene: Scene;
  sceneTitle?: string;
  text?: string;
  speaker?: keyof CharactersState;
  tagStyle?: string;
  choices?: ChoiceData[];
  choiceSide?: 'left' | 'right' | 'middle';
  effects: Effect[];
  character?: CharacterConfig;
  xray: XRayState;
  hud: HUDPayload;
}

export interface TextPayload {
  text: string;
  speaker?: keyof CharactersState;
}

export interface ScenePayload {
  scene: Scene;
  sceneTitle: string;
}

type ChoicePosition = 'left' | 'right' | 'middle';
export interface ChoicesPayload {
  choices: ChoiceData[];
  side: ChoicePosition;
}

type PhonePosition = 'left' | 'right' | 'middle';

export interface HUDPayload {
  phone: {
    open: boolean;
    openApp: string;
    position?: PhonePosition;
  }
  inventory: {
    open: boolean;
  }
  hideHUD: boolean;
}

export interface MovePhonePayload {
  
}

export const initialState: DisplayState = {
  scene: 'splash_screen',
  sceneTitle: '',
  effects: [],
  xray: 'off',
  hud: {
    phone: {
      open: false,
      openApp: ''
    },
    inventory: {
      open: false
    },
    hideHUD: false
  }
};

const { actions, reducer } = createSlice({
  name: 'display',
  initialState,
  reducers: {
    _text: (state, { payload }: PayloadAction<TextPayload>) => ({
      ...state,
      text: payload.text,
      speaker: payload.speaker,
      choices: undefined,
    }),
    _choices: (state, { payload }: PayloadAction<ChoicesPayload>) => ({
      ...state,
      text: undefined,
      speaker: undefined,
      choices: payload.choices,
      choiceSide: payload.side,
    }),
    clearText: (state) => ({
      ...state,
      text: undefined,
      choices: undefined,
    }),
    setXRay: (state, { payload }: PayloadAction<XRayState>) => ({
      ...state,
      xray: payload,
    }),
    toggleXRay: (state) => {
      // Default new state to 'off'
      let xray: XRayState = 'off';

      // If the current state is 'off', cycle to 'partial'
      if (state.xray === 'off') xray = 'partial';
      // Else if current state if 'partial', cycle to 'full'
      else if (state.xray === 'partial') xray = 'full';

      return {
        ...state,
        xray,
      };
    },
    goto: (state, { payload }: PayloadAction<ScenePayload>) => ({
      ...state,
      scene: payload.scene,
      sceneTitle: payload.sceneTitle
    }),
    toggleHideHUD: (state) => ({
      ...state,
      hud: {
        ...state.hud,
        hideHUD: !state.hud.hideHUD
      }
    }),
    _phone: (state, { payload }) => ({
      ...state,
      hud: {
        ...state.hud,
        phone: {
          open: true,
          openApp: payload.openApp,
        }
      }
    }),
    togglePhone: (state) => ({
      ...state,
      hud: {
        ...state.hud,
        phone: {
          ...state.hud.phone,
          open: !state.hud.phone.open,
        }
      }
    }),
    movePhone: (state) => ({
      ...state,
      hud: {
        ...state.hud,
        phone: {
          ...state.hud.phone,
        }
      }
    }),
    toggleInventory: (state) => ({
      ...state,
      hud: {
        ...state.hud,
        inventory: {
          open: !state.hud.inventory.open
        }
      }
    }),
    closeOverlay: (state) => ({
      ...state,
      hud: {
        phone: {
          ...state.hud.phone,
          open: false,
        },
        inventory: {
          open: false
        },
        hideHUD: false
      }
    })
  },
});

const { _text, _choices, clearText, setXRay, toggleXRay, goto, toggleHideHUD, togglePhone, toggleInventory, closeOverlay, _phone } = actions;

export { clearText, setXRay, toggleXRay, goto, toggleHideHUD, togglePhone, toggleInventory, closeOverlay };

export const text = (text: string, speaker?: keyof CharactersState) =>
  _text({
    text,
    speaker,
  });

export const choices = (
  side: 'left' | 'right' | 'middle',
  choices: ChoiceData[]
) =>
  _choices({
    side,
    choices,
  });

export const openPhone = (openApp: string) => _phone({
  openApp
})

export default reducer;
