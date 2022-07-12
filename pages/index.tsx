import type { GetServerSideProps, NextPage } from 'next';
import Container from '@mui/material/Container';
import Vacancies from '../src/vacancies/Vacancies.useEffect';
import { db } from '../prisma';
import { VacanciesProps } from '../src/vacancies/vacancies.types';

const Home: NextPage<VacanciesProps> = (props) => {
  return (
    <Container maxWidth="lg">
      <Vacancies {...props} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const vacancies = await db.vacancy.findMany({
    select: {
      id: true,
      title: true,
      office: {
        select: {
          address: true,
          name: true,
          city: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  const cities = await db.city.findMany({
    select: {
      id: true,
      name: true
    }
  })
  const offices = await db.office.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      cityId: true
    }
  })

  return {
    props: {
      vacancies,
      cities: [{ id: "ANY", name: "Любой" }, ...cities],
      offices: [{ id: "ANY", name: "Любой" }, ...offices]
    }, // will be passed to the page component as props
  }
}

export default Home;
