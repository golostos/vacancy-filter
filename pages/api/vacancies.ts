import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextApiHandler } from "next";
import { ZodError } from "zod";
import { db } from "../../prisma";
import createError from "http-errors";
import { VacanciesQuerySchema } from '../../src/dtos';

const getVacancies: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {    
    try {
      console.log('API!!!!!! getVacancies!!!!!!!!')
      const query = VacanciesQuerySchema.parse(req.query);
      const vacancies = await db.vacancy.findMany({
        where: {
          AND: [
            {
              office: {
                cityId: query.city,
              },
            },
            {
              officeId: query.office,
            },
            {
              experience: query.experience,
            },
          ],
        },
        select: {
          id: true,
          title: true,
          experience: true,
          office: {
            select: {
              address: true,
              name: true,
              city: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      res.send(vacancies);
    } catch (error) {
      if (error instanceof ZodError)
        res.status(400).send({ error });
      if (error instanceof PrismaClientKnownRequestError)
        res.status(500).send({ error: "DB error" });
    }
  } else {
    const error = new createError.NotFound();
    res.status(error.status).send(error.message);
  }
};

export default getVacancies;
