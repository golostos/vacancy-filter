import { Grid, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'
import { Dispatch } from 'react'
import { Action, ActionKind, State } from '../reducers/types.reducers'
import { experienceRus } from './vacancies.types'

type FilterVacanciesProps = { state: State, dispatch: Dispatch<Action> }

const FilterVacancies: React.FC<FilterVacanciesProps> = ({ state, dispatch }) => {
  return (
    <Box display='flex' justifyContent='center' sx={{my: 2}}>
      <Grid spacing={2} container sx={{
        maxWidth: 800,
      }}>
        <Grid item sm={4} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="city-select-label">Город</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={state.cityId}
              label="Город"
              onChange={e => dispatch({ type: ActionKind.CITY, payload: e.target.value })}
            >
              {
                state.cities.map(city => <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="office-select-label">Офис</InputLabel>
            <Select
              labelId="office-select-label"
              id="office-select"
              value={state.officeId}
              label="Офис"
              onChange={e => dispatch({ type: ActionKind.OFFICE, payload: e.target.value })}
            >
              {
                state.offices
                  .filter(office => office.show)
                  .map(office => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormControl sx={{ width: '100%' }}>
            <InputLabel id="experience-select-label">Опыт</InputLabel>
            <Select
              labelId="experience-select-label"
              id="experience-select"
              value={state.experience}
              label="Опыт"
              onChange={e => dispatch({ type: ActionKind.EXPERIENCE, payload: e.target.value })}
            >
              {
                Object.entries(experienceRus).map(([key, rus]) =>
                  <MenuItem key={key} value={key}>{rus}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FilterVacancies