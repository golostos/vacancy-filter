import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { VacancyDto } from '../dtos'
import VacancyCard from './VacancyCard'

type CardsProps = {
  loading: boolean
  vacancies: VacancyDto[]
}

const VacancyCards: React.FC<CardsProps> = ({ loading, vacancies }) => {
  return (
    <Grid container spacing={2}>
      {(loading ? [null, null, null] : vacancies).map((vacancy, index) => (
        <Grid item sm={4} xs={12}>
          {
            vacancy ? (
              <VacancyCard vacancy={vacancy} key={vacancy.id} />
            ) : (
              <Box key={index}>
                <Skeleton variant="rectangular" width={'100%'} height={118} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
            )
          }
        </Grid>
      ))}
    </Grid>
  )
}

export default VacancyCards