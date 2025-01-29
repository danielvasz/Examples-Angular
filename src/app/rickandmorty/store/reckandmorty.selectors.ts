import { createSelector } from "@ngrx/store";
import { CharacterState } from "../interfaces/rickandmorty-interface";

export const selectCharacterState = (state: any) => state.character;

export const selectCharacter = createSelector(
    selectCharacterState,
    (state) => state.character
)