import { Experience } from '@prisma/client';
import { z } from "zod";

export type OfficeDto = {
  id: string;
  address: string;
  name: string;
  cityId: string;
};

export type CityDto = {
  id: string;
  name: string;
};

export type VacancyDto = {
  id: string;
  title: string;
  experience: Experience;
  office: {
    address: string;
    name: string;
    city: {
      name: string;
    };
  };
};

export const experienceSchema = z.enum(["JUNIOR", "MIDDLE", "SENIOR", "ANY"]);

export const vacancyDtosSchema = z.object({
    id: z.string({ required_error: "" }).uuid(),
    title: z.string(),
    experience: experienceSchema,
    office: z.object({
      address: z.string(),
      name: z.string(),
      city: z.object({
        name: z.string(),
      }),
    }),
  })
  .array();

export const VacanciesQuerySchema = z.object({
  city: z.string().uuid().optional(),
  office: z.string().uuid().optional(),
  experience: experienceSchema.optional(),
});

export type VacanciesQueryDto = z.infer<typeof VacanciesQuerySchema>
