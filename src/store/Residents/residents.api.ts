import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IClientRes, IFormInput, IStreets } from '../../models/models'

export const residentsApi = createApi({
  reducerPath: 'residents/api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  // refetchOnFocus: true,
  tagTypes: ['Clients'],
  endpoints: (build) => ({
    getClients: build.query<any, number>({
      query: (addressId) => ({
        url: `/HousingStock/clients`,
        params: {
          addressId: addressId,
        },
      }),
      providesTags: (result) => ['Clients'],
    }),
    deleteClients: build.mutation<any, number>({
      query: (id) => ({
        url: `/HousingStock/bind_client/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
    createClients: build.mutation<IClientRes, IFormInput>({
      query: (client) => ({
        url: `/HousingStock/client`,
        method: 'POST',
        body: {
          Id: 0,
          Name: client.name,
          Phone: client.phone,
          Email: client.email,
          BindId: 0,
        },
      }),
    }),
    bindClients: build.mutation<any, any>({
      query: ({ adress, client }) => ({
        url: `/HousingStock/bind_client`,
        method: 'PUT',
        body: {
          AddressId: adress,
          ClientId: client,
        },
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useCreateClientsMutation,
  useBindClientsMutation,
  useDeleteClientsMutation,
} = residentsApi
