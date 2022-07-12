import { experienceSchema, vacancyDtosSchema } from '../dtos';
import { State, Action, ActionKind } from './types.reducers';

// Работа с кнопками
export function filterReducer(state: State, action: Action): State {
  const findOfficeCityId = () => state.offices.find(office => office.id === state.officeId)?.cityId;
  if (typeof action.payload === "string")
    switch (action.type) {
      case ActionKind.CITY:
        const cityId = action.payload
        return {
          ...state,
          cityId,
          offices: state.offices.map(office => ({
            ...office,
            show: cityId === 'ANY' || office.cityId === cityId || office.id === 'ANY',
          })),
          officeId: (cityId === findOfficeCityId() || cityId === 'ANY') ? state.officeId : 'ANY'
        }
      case ActionKind.OFFICE:
        return {
          ...state,
          officeId: action.payload
        };
      case ActionKind.EXPERIENCE:
        return {
          ...state,
          experience: experienceSchema.parse(action.payload)
        };
    }
  return state
}