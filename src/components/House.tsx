import React from 'react'
import { apartmentsApi } from '../store/Apartment/apartments.api'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  CircularProgress,
} from '@mui/material'
import { IFlat, IHouse } from '../models/models'
import Flat from './Flat'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface HouseProps {
  house: IHouse
  streetId: number
}

function House({ house, streetId }: HouseProps) {
  const [fethFlat, { data: flats, isLoading: loadingFlats }] =
    apartmentsApi.useLazyGetFlatQuery({})

  // const [fethClients, { data: cliets }] = apartmentsApi.useLazyGetClientsQuery(
  //   {}
  // )

  const handleClick = (streetId: number) => (event: React.SyntheticEvent) => {
    fethFlat(streetId)
    // fethClients(2122673)
  }

  return (
    <Accordion>
      <AccordionSummary
        onClick={handleClick(house.id)}
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>{house.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography component={'span'}>
          <Grid container spacing={2} direction='column'>
            {loadingFlats && <CircularProgress color='secondary' />}
            {flats &&
              flats.map((flat: IFlat) => (
                <Grid key={flat.id}>
                  <Flat flat={flat} />
                </Grid>
              ))}
          </Grid>
        </Typography>
      </AccordionDetails>
    </Accordion>
  )

  // <div onClick={handleClick(house.id)}>Дом&nbsp;{house.name}</div>
}

export default House
