import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://crowd-investing-backend.onrender.com' }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        signIn: builder.mutation({
            query: (userCredentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: userCredentials
            })
        }),
        signUp: builder.mutation({
            query: (userCredentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userCredentials
            })
        })
    })
})

export const { useSignInMutation, useSignUpMutation } = apiSlice