import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetClientsQuery } from '../store/Apartment/apartments.api'
import { IClient } from '../models/models'
import UserCard from '../components/UserCard'

function Residents() {
  const params = useParams<'id'>()
  let navigate = useNavigate()

  const {
    isLoading: isLoading,
    error: isError,
    data: users,
  } = useGetClientsQuery(Number(params.id))

  console.log(users)

  return (
    <div>
      {users ? (
        users.map((user: IClient) => <UserCard key={user.id} user={user} />)
      ) : (
        <span>Жильцов нету</span>
      )}
    </div>
  )
}

export default Residents
