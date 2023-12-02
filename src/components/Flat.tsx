import React from 'react'
import { IFlat } from '../models/models'
import { apartmentsApi } from '../store/Apartment/apartments.api'
import { Link } from '@mui/material'

interface HouseProps {
  flat: IFlat
}

function Flat({ flat }: HouseProps) {
  const [fethClients, { data: client, isLoading: loadingClients }] =
    apartmentsApi.useLazyGetClientsQuery({})

  const handleClick = (id: number) => (event: React.SyntheticEvent) => {
    fethClients(id)
  }

  return (
    <>
      {' '}
      <Link href={`/detail-apartment/${flat.id}`}>{flat.name}</Link>
      {/* onClick={handleClick(flat.id)} */}
    </>
  )
}

export default Flat
