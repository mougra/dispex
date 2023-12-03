import React from 'react'
import { apartmentsApi } from '../store/Apartment/apartments.api'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { IFlat, IHouse } from '../models/models'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

interface HouseProps {
  house: IHouse
  streetId: number
}

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
}

const link = {
  textDecoration: 'none',
  color: 'gray',
}

function House({ house, streetId }: HouseProps) {
  const [fethFlat, { data: flats, isLoading: loadingFlats }] =
    apartmentsApi.useLazyGetFlatQuery({})

  const handleClick = (streetId: number) => (event: React.SyntheticEvent) => {
    fethFlat(streetId)
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
        <List style={style} component='nav' aria-label='mailbox folders'>
          {loadingFlats && <CircularProgress color='secondary' />}
          {flats &&
            flats.map((flat: IFlat) => (
              <Link
                key={flat.id}
                style={link}
                to={`/detail-apartment/${flat.id}`}
              >
                <ListItem button divider>
                  <ListItemText primary={flat.name}> </ListItemText>
                </ListItem>
              </Link>
            ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default House
