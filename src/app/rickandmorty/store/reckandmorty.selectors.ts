import { createSelector } from "@ngrx/store";

export const selectCharacterState = (state: any) => state.character;

export const selectCharacter = createSelector(
    selectCharacterState,
    (state) => state.character
);