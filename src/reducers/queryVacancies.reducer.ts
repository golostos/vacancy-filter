import { vacancyDtosSchema } from '../dtos';
import { State, Action, ActionKind } from './types.reducers';

// Работа с запросами
export function queryReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionKind.VACANCIES:
      return {
        ...state,
        isLoading: false,
        vacancies: vacancyDtosSchema.parse(action.payload)
      };
    case ActionKind.FAILURE:
      if (action.payload instanceof Error) return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ActionKind.REMOVE_ERROR:
      return {
        ...state,
        error: null
      }
  }
  return state
}