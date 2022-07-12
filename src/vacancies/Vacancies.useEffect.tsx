import { Grid, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useReducer } from 'react';
import { useVacancies } from '../hooks/useVacancies';
import { ActionKind, State } from '../reducers/types.reducers';
import { VacanciesProps, experienceRus } from './vacancies.types';
import { vacanciesReducer } from '../reducers/fullVacancies.reducer';
import FilterVacancies from './FilterVacancies';
import VacancyCards from './VacancyCards';

export default function Vacancies({ cities, offices, vacancies }: VacanciesProps) {
  const initialState: State = {
    cityId: cities[0].id,
    officeId: offices[0].id,
    experience: 'ANY',
    cities,
    offices: offices.map(office => ({ ...office, show: true })),
    vacancies,
    isLoading: false,
    error: null
  };

  const [state, dispatch] = useReducer(vacanciesReducer, initialState);
  useVacancies(state, dispatch);

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch({ type: ActionKind.REMOVE_ERROR })
  };

  return (
    <>
      <FilterVacancies state={state} dispatch={dispatch} />
      <VacancyCards vacancies={state.vacancies!} loading={state.isLoading!} />
      <Snackbar open={!!state.error} autoHideDuration={5000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Произошла какая-то ошибка! Попробуйте позже.
        </Alert>
      </Snackbar>
    </>
  )
}
