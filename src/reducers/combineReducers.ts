import { VacanciesReducer } from './types.reducers';

export function combineReducers(...reducers: VacanciesReducer[]) {
  const reducer: VacanciesReducer = (state, action) => {
    return reducers.reduce((prevState, reducer) => reducer(prevState, action), state)
  }
  return reducer
}