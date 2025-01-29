import { createReducer, on } from '@ngrx/store';
import { getCharacter, loadCharacter } from './rickandmorty.actions';
import { CharacterState } from '../interfaces/rickandmorty-interface';

export const initialState: CharacterState = {
    character: []
};

export const characterReduce = createReducer(
  initialState,
  on(loadCharacter, (state, { character }) => ({
    ...state,
    character: [...state.character || [], character]
  })),
  on(getCharacter, (state, { character }) => ({
    ...state,
    character
  }))
);