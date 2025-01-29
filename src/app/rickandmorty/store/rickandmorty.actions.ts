import { createAction, props } from '@ngrx/store';
import { Character } from '../interfaces/rickandmorty-interface';

export const loadCharacter = createAction(
    '[Character] Load Character',
    props<{ character: Character }>()
);

export const getCharacter = createAction(
    '[Character] Get Character',
    props<{ character: Character[] }>()
);