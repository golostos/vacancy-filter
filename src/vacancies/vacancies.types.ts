import { Experience } from "@prisma/client";
import { VacancyDto, CityDto, OfficeDto } from '../dtos';

export const experienceRus: { [key in Experience]: string } = {
  ANY: "Любой",
  JUNIOR: "Начальный",
  MIDDLE: "Средний",
  SENIOR: "Опытный",
};

export type VacanciesProps = {
  vacancies: VacancyDto[];
  cities: CityDto[];
  offices: OfficeDto[];
};
