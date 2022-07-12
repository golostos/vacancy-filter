import { Experience } from "@prisma/client";
import { Reducer } from 'react';
import { VacancyDto, CityDto, OfficeDto } from '../dtos';

export enum ActionKind {
  CITY = "CITY",
  OFFICE = "OFFICE",
  EXPERIENCE = "EXPERIENCE",
  VACANCIES = "VACANCIES",
  REQUEST = "REQUEST",
  FAILURE = "FAILURE",
  REMOVE_ERROR = "REMOVE_ERROR",
}

export type Action = {
  type: ActionKind;
  payload?: string | VacancyDto[] | Error;
};

export type State = {
  cityId: "ANY" | string;
  officeId: "ANY" | string;
  experience: Experience;
  cities: CityDto[];
  offices: (OfficeDto & { show: boolean })[];
  vacancies?: VacancyDto[];
  isLoading?: boolean;
  error?: Error | null
};

export type VacanciesReducer = Reducer<State, Action>