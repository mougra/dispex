import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IFormInput } from '../models/models'
import { useEffect } from 'react'
import { residentsApi } from '../store/Residents/residents.api'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputMask from 'react-input-mask'

const error = {
  color: 'red',
}

const schema = yup
  .object({
    name: yup.string().min(3).max(20).required(),
    email: yup
      .string()
      .email()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'not a valid email'
      )
      .required(),
    phone: yup
      .string()
      .matches(/(.*\d.*){11}/, 'must be exactly 11 digits')
      .required(),
  })
  .required()

interface ControlPanelProps {
  adressId: number
}

function ControlPanel({ adressId }: ControlPanelProps) {
  let navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const [postCreateClients, { data: clients, isLoading }] =
    residentsApi.useCreateClientsMutation({})
  const [putBindClients, { data }] = residentsApi.useBindClientsMutation({})

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.phone = data.phone.replace(/\D+/g, '')
    console.log(data.phone.length)

    postCreateClients(data)
    reset()
    setOpen(false)
  }

  useEffect(() => {
    if (clients) putBindClients({ adress: adressId, client: clients?.id })
  }, [isLoading])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4} md={3} lg={2}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Button variant='contained' color='success' onClick={handleClickOpen}>
            Add a new tenant to the house
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add</DialogTitle>
        <DialogContent onSubmit={handleSubmit(onSubmit)}>
          <DialogContentText>
            Please enter client's name, email & phone .
          </DialogContentText>
          <Controller
            name='name'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin='dense'
                id='name'
                label='Name'
                type='text'
                fullWidth
                variant='standard'
              />
            )}
          />
          <p style={error}>{errors.name?.message}</p>
          <Controller
            name='email'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin='dense'
                id='email'
                label='Email'
                type='email'
                fullWidth
                variant='standard'
              />
            )}
          />
          <p style={error}>{errors.email?.message}</p>
          <Controller
            name='phone'
            control={control}
            defaultValue={''}
            render={(field) => (
              <InputMask
                mask={'+7 (999) 999-99-99'}
                value={field.field.value}
                disabled={false}
                onChange={(value): void => {
                  field.field.onChange(value)
                }}
              >
                <TextField
                  name='Phone'
                  type='text'
                  label='phone'
                  placeholder='Ex: +7 (999) 999-99-99'
                  fullWidth
                  // variant='standard'
                  margin='dense'
                />
              </InputMask>
            )}
          />
          <p style={error}>{errors.phone?.message}</p>
        </DialogContent>
        <DialogActions>
          <Button type='submit' onClick={handleSubmit(onSubmit)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ControlPanel
