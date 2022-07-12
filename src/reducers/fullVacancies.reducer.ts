import { combineReducers } from './combineReducers';
import { filterReducer } from './filterVacancies.reducer';
import { queryReducer } from './queryVacancies.reducer';

export const vacanciesReducer = combineReducers(filterReducer, queryReducer)