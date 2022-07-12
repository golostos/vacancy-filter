import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import { VacancyDto } from '../dtos'
import { experienceRus } from './vacancies.types'

type CardProps = {
  vacancy: VacancyDto
}

const VacancyCard: React.FC<CardProps> = ({ vacancy }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {vacancy.title}
        </Typography>
        <Typography variant="h5" component="div">
          Опыт: {experienceRus[vacancy.experience]}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Офис: {vacancy.office.name}
        </Typography>
        <Typography variant="body2">
          Адрес: {vacancy.office.city.name}, {vacancy.office.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Подать заявку</Button>
      </CardActions>
    </Card>
  )
}

export default VacancyCard