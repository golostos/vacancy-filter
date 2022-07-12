import axios, { AxiosError } from 'axios';
import { Dispatch, useEffect, useRef } from 'react';
import { VacanciesQueryDto, vacancyDtosSchema } from '../dtos';
import { Action, ActionKind, State } from '../reducers/types.reducers';

function makeQueryString(query: VacanciesQueryDto) {
  return Object.entries(query)
    .filter(([key, value]) => value !== "ANY")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function delay(ms = 0) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}

export function useVacancies(state: State, dispatch: Dispatch<Action>) {
  const firstRender = useRef(true);
  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const sendRequest = async () => {
      await delay();
      if (ignore) return;
      if (!firstRender.current) {
        dispatch({ type: ActionKind.REQUEST });
        const res = await axios.get('/api/vacancies?' + makeQueryString({
          city: state.cityId,
          office: state.officeId,
          experience: state.experience
        }), {
          signal: controller.signal
        })
        const result = vacancyDtosSchema.parse(res.data);
        dispatch({ type: ActionKind.VACANCIES, payload: result });
      } else firstRender.current = false;
    }

    sendRequest().catch((error: Error) => {
      console.error(error)
      if (error instanceof AxiosError && error.code !== 'ERR_CANCELED') {
        dispatch({ type: ActionKind.FAILURE, payload: error })
      }
    })

    return () => {
      ignore = true;
      controller.abort();
    }
  }, [state.cityId, state.officeId, state.experience])
}