import React from 'react'
import { useGetStreetsQuery } from '../store/Apartment/apartments.api'
import { IStreets } from '../models/models'

import Streets from '../components/Streets'
import { Container, Grid } from '@mui/material'

function Apartment() {
  const {
    isLoading: isLoading,
    error: isError,
    data: streets,
  } = useGetStreetsQuery(1)

  return (
    <Container>
      <Grid container spacing={3} direction='column'>
        {streets &&
          streets.map((street: IStreets) => (
            <Grid item key={street.id} xs={12}>
              <Streets street={street} />
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default Apartment
