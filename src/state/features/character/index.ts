import { createSlice } from '@reduxjs/toolkit';

// Types
import type { SceneState } from '../scene';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Expression, DisplayModifiers } from './characters/base';

// Characters
import mc, { MCState, SetMC } from './characters/mc';
import flora, { FloraState, SetFlora } from './characters/flora';
import isabelle, { IsabelleState, SetIsabelle } from './characters/isabelle';
import jo, { JoState, SetJo } from './characters/jo';
import kate, { KateState, SetKate } from './characters/kate';
import lindsey, { LindseyState, SetLindsey } from './characters/lindsey';
import mrsl, { MrsLState, SetMrsL } from './characters/mrsl';
import nurse, { NurseState, SetNurse } from './characters/nurse';
import jacklyn, { JacklynState, SetJacklyn } from './characters/jacklyn';

interface EquipUnequipPayload {
  character: keyof CharactersState;
  item: string;
}

interface ShowPayload {
  character: keyof CharactersState;
  expression: Expression;
  modifiers?: DisplayModifiers;
}

interface HidePayload {
  character: keyof CharactersState;
  modifiers?: DisplayModifiers;
}

interface MovePayload {
  character: keyof CharactersState;
  position: number;
}

interface AddRemoveItemPayload {
  character: keyof CharactersState;
  item: string;
}

interface NamePayload {
  character: keyof CharactersState;
  name: string;
}

type SingleCharacterState =
  | MCState
  | JoState
  | FloraState
  | IsabelleState
  | KateState
  | MrsLState
  | NurseState
  | JacklynState
  | LindseyState;

type SetPayload =
  | SetMC
  | ((state: CharactersState) => SetMC)
  | SetFlora
  | ((state: CharactersState) => SetFlora)
  | SetIsabelle
  | ((state: CharactersState) => SetIsabelle)
  | SetJo
  | ((state: CharactersState) => SetJo)
  | SetKate
  | ((state: CharactersState) => SetKate)
  | SetLindsey
  | ((state: CharactersState) => SetLindsey)
  | SetJacklyn
  | ((state: CharactersState) => SetJacklyn)
  | SetMrsL
  | ((state: CharactersState) => SetMrsL)
  | SetNurse
  | ((state: CharactersState) => SetNurse);

export interface CharactersState {
  mc: MCState;
  flora: FloraState;
  isabelle: IsabelleState;
  jo: JoState;
  kate: KateState;
  lindsey: LindseyState;
  jacklyn: JacklynState;
  mrsl: MrsLState;
  nurse: NurseState;
}

export interface CharacterState extends CharactersState {
  current: Array<keyof CharactersState>;
}

export const initialState: CharacterState = {
  current: [],
  mc,
  flora,
  isabelle,
  jo,
  kate,
  lindsey,
  mrsl,
  nurse,
  jacklyn,
};

const { actions, reducer } = createSlice({
  name: 'character',
  initialState,
  reducers: {
    _equip: (state, { payload }: PayloadAction<EquipUnequipPayload>) => ({
      ...state,
      [payload.character]: {
        ...state[payload.character],
        equipment: [...state[payload.character].equipment, payload.item],
      },
    }),
    _unequip: (state, { payload }: PayloadAction<EquipUnequipPayload>) => ({
      ...state,
      [payload.character]: {
        ...state[payload.character],
        equipment: state[payload.character].equipment.filter(
          (item) => item !== payload.item
        ),
      },
    }),
    _show: (state, { payload }: PayloadAction<ShowPayload>) => ({
      ...state,
      current: [
        ...state.current.filter((char) => char !== payload.character),
        payload.character,
      ],
      [payload.character]: {
        ...state[payload.character],
        position:
          payload.modifiers?.at !== undefined
            ? payload.modifiers.at
            : state[payload.character].position,
        expression: payload.expression,
        modifiers: {
          ...state[payload.character].modifiers,
          ...payload.modifiers,
        },
      },
    }),
    _hide: (state, { payload }: PayloadAction<HidePayload>) => ({
      ...state,
      current: state.current.filter((id) => id !== payload.character),
      [payload.character]: {
        ...state[payload.character],
        modifiers: payload.modifiers ?? {},
      },
    }),
    _moveTo: (state, { payload }: PayloadAction<MovePayload>) => ({
      ...state,
      [payload.character]: {
        ...state[payload.character],
        position: payload.position,
      },
    }),
    cset: (state, { payload }: PayloadAction<SetPayload>) => {
      const { character, ...fields } =
        typeof payload === 'function' ? payload(state) : payload;

      return {
        ...state,
        [character]: {
          ...state[character],
          ...fields,
        },
      };
    },
    _addItem: (state, { payload }: PayloadAction<AddRemoveItemPayload>) => ({
      ...state,
      [payload.character]: {
        ...state[payload.character],
        inventory: [...state[payload.character].inventory, payload.item],
      },
    }),
    _changeName: (state, { payload }: PayloadAction<NamePayload>) => ({
      ...state,
      [payload.character]: {
        ...state[payload.character],
        name: payload.name,
      },
    }),

    _removeItem: (state, { payload }: PayloadAction<AddRemoveItemPayload>) => ({
      ...state,
      [payload.character]: {
        ...state[payload.character],
        inventory: state[payload.character].inventory.filter(
          (item) => item !== payload.item
        ),
      },
    }),
  },
});

// Selectors
export const getEquipment = (character: SingleCharacterState) =>
  character.equipment.reduce<{ [key: string]: boolean }>(
    (equipment, wearing) => ({ ...equipment, [wearing]: true }),
    {}
  );

export const hasItem = (character: SingleCharacterState, item: string) =>
  !!character.inventory.find((inv) => inv === item);

const {
  _equip,
  _unequip,
  _show,
  _hide,
  _moveTo,
  cset,
  _addItem,
  _changeName,
  _removeItem,
} = actions;

export const equip = (character: keyof CharactersState, item: string) =>
  _equip({
    character,
    item,
  });

export const unequip = (character: keyof CharactersState, item: string) =>
  _unequip({
    character,
    item,
  });

export const show = (
  character: keyof CharactersState,
  expression: Expression,
  modifiers?: DisplayModifiers
) =>
  _show({
    character,
    expression,
    modifiers,
  });

export const hide = (
  character: keyof CharactersState,
  modifiers?: DisplayModifiers
) => _hide({ character, modifiers });

export const moveTo = (character: keyof CharactersState, position: number) =>
  _moveTo({ character, position });

export const addItem = (character: keyof CharactersState, item: string) =>
  _addItem({
    character,
    item,
  });

export const changeName = (character: keyof CharactersState, name: string) =>
  _changeName({
    character,
    name,
  });

export const removeItem = (character: keyof CharactersState, item: string) =>
  _removeItem({
    character,
    item,
  });

export { cset };

export * from './characters/base';

export default reducer;
