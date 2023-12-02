import React from 'react'
import { IClient } from '../models/models'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'

interface UserCardProps {
  user: IClient
}

function UserCard({ user }: UserCardProps) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {user && <div>{user.name}</div>}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {/* Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default UserCard
