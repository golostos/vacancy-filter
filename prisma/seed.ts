import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["query"] });

async function start() {
  await db.$transaction([
    db.vacancy.deleteMany(),
    db.office.deleteMany(),
    db.city.deleteMany(),
  ]);
  const [city1, city2] = await db.$transaction([
    db.city.create({
      data: {
        name: "Волгоград",
        Office: {
          createMany: {
            data: [
              {
                name: "Main office",
                address: "Lenina st, 5",
              },
              {
                name: "Second office",
                address: "Lenina st, 25",
              },
            ],
          },
        },
      },
      include: {
        Office: true,
      },
    }),
    db.city.create({
      data: {
        name: "Волжский",
        Office: {
          createMany: {
            data: [
              {
                name: "Third office",
                address: "Lenina st, 35",
              },
              {
                name: "Fourth office",
                address: "Lenina st, 45",
              },
            ],
          },
        },
      },
      include: {
        Office: true,
      },
    }),
  ]);

  await db.vacancy.createMany({
    data: [
      {
        officeId: city1.Office[0].id,
        title: "First vacancy",
        experience: "MIDDLE",
      },
      {
        officeId: city1.Office[1].id,
        title: "Second vacancy",
        experience: "SENIOR",
      },
      {
        officeId: city2.Office[0].id,
        title: "Third vacancy",
        experience: "MIDDLE",
      },
      {
        officeId: city2.Office[1].id,
        title: "Fourth vacancy",
      },
    ],
  });

  console.log("Success seeding");
}

start();
