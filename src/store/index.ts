import { configureStore } from '@reduxjs/toolkit'
import { apartmentsApi } from './Apartment/apartments.api'

export const store = configureStore({
  reducer: {
    [apartmentsApi.reducerPath]: apartmentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apartmentsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
