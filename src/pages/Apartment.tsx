import React from 'react'
import { useGetStreetsQuery } from '../store/Apartment/apartments.api'
import { IStreets } from '../models/models'

import Streets from '../components/Streets'

function Apartment() {
  const {
    isLoading: isLoading,
    error: isError,
    data: streets,
  } = useGetStreetsQuery(123)

  return (
    <>
      {streets &&
        streets.map((street: IStreets) => (
          <Streets key={street.id} street={street} />
        ))}
    </>
  )
}

export default Apartment
