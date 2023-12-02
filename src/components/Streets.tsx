import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  CircularProgress,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import { apartmentsApi } from '../store/Apartment/apartments.api'
import { IHouse, IStreets } from '../models/models'
import House from './House'

interface StreetProps {
  street: IStreets
}

function Streets({ street }: StreetProps) {
  const [fethHouses, { data: houses, error, isLoading: loadingHouses }] =
    apartmentsApi.useLazyGetHouseQuery({})

  const handleClick = (id: number) => (event: React.SyntheticEvent) => {
    fethHouses(id)
  }

  return (
    <div>
      {' '}
      <Accordion>
        <AccordionSummary
          onClick={handleClick(street.id)}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>
            {street.prefix.name}.{street.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <Grid container spacing={2} direction='column'>
              {loadingHouses && <CircularProgress color='secondary' />}
              {houses &&
                houses.map((house: IHouse) => (
                  <Grid key={house.id} xs={8}>
                    <House house={house} streetId={street.id} />
                    {/* Дом&nbsp;{house.name} */}
                  </Grid>
                ))}
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Streets
