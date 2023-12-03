import { configureStore } from '@reduxjs/toolkit'
import { apartmentsApi } from './Apartment/apartments.api'
import { residentsApi } from './Residents/residents.api'

export const store = configureStore({
  reducer: {
    [apartmentsApi.reducerPath]: apartmentsApi.reducer,
    [residentsApi.reducerPath]: residentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apartmentsApi.middleware,
      residentsApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
