import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IStreets } from '../../models/models'

export const apartmentsApi = createApi({
  reducerPath: 'apartments/api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  // refetchOnFocus: true,
  endpoints: (build) => ({
    getStreets: build.query<IStreets[], any>({
      query: () => ({
        url: `Request/streets`,
      }),
    }),
    getHouse: build.query<any, number>({
      query: (houseId) => ({
        url: `/Request/houses/${houseId}`,
      }),
    }),
    getFlat: build.query<any, number>({
      query: (id) => ({
        url: `Request/house_flats/${id}`,
      }),
    }),
    getClients: build.query<any, number>({
      query: (addressId) => ({
        url: `/HousingStock/clients`,
        params: {
          addressId: addressId,
        },
      }),
    }),
    getHousingStock: build.query<any, any>({
      query: ({ companyId = 123, streetId, houseId }) => ({
        url: `/HousingStock`,
        params: {
          companyId: companyId,
          streetId: streetId,
          houseId: houseId,
        },
      }),
    }),
  }),
})

export const {
  useGetStreetsQuery,
  useLazyGetHouseQuery,
  useLazyGetFlatQuery,
  useLazyGetHousingStockQuery,
  useLazyGetClientsQuery,
  useGetClientsQuery,
} = apartmentsApi
