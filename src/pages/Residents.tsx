import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetClientsQuery } from '../store/Residents/residents.api'
import { IClient } from '../models/models'
import UserCard from '../components/UserCard'
import { Container, Grid, Stack, Typography } from '@mui/material'
import ControlPanel from '../components/ControlPanel'
import { CircularProgress } from '@mui/material'

function Residents() {
  const params = useParams<'id'>()

  const {
    isLoading: isLoading,
    error: isError,
    data: users,
  } = useGetClientsQuery(Number(params.id))

  return (
    <Container>
      <Stack spacing={2}>
        <ControlPanel adressId={Number(params.id)} />
        {isLoading && <CircularProgress color='secondary' />}
        {!isLoading && (
          <Grid container spacing={2}>
            {users ? (
              users.map((user: IClient) => (
                <Grid key={user.id} item xs={6} sm={4} md={3} lg={2}>
                  <UserCard user={user} />
                </Grid>
              ))
            ) : (
              <Typography variant='subtitle2' gutterBottom>
                Жильцов нету
              </Typography>
            )}
          </Grid>
        )}
      </Stack>
    </Container>
  )
}

export default Residents
