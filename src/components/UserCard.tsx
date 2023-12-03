import React from 'react'
import { IClient } from '../models/models'
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material'
import { residentsApi } from '../store/Residents/residents.api'

interface UserCardProps {
  user: IClient
}

function UserCard({ user }: UserCardProps) {
  const [deleteClients, { data: deletUser }] =
    residentsApi.useDeleteClientsMutation({})

  const handleSubmit: any = () => {
    deleteClients(user.id)
  }

  return (
    <>
      {user && (
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h2' sx={{ fontSize: 22 }} gutterBottom>
              {user.name}
            </Typography>
            <Typography
              variant='h5'
              color='text.secondary'
              sx={{ fontSize: 16 }}
              component='div'
            >
              {user.email}
              <br />
              {user.phone}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant='outlined' color='error' onClick={handleSubmit}>
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  )
}

export default UserCard
