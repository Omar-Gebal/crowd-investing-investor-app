import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://crowd-investing-backend.onrender.com' }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        //auth
        signIn: builder.mutation({
            query: (userCredentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: userCredentials
            })
        }),
        signUp: builder.mutation({
            query: (userCredentials) => ({
                url: '/investors/register',
                method: 'POST',
                body: userCredentials
            })
        }),

        getLoggedInUser: builder.query({
            query: (accessToken) => ({
                url: '/investors/me',
                method: 'GET',
                headers: {
                    authorization: `Bearer ${accessToken}`
                }

            })

        }),

        //campgains
        getAllCampaigns: builder.query({
            query: () => '/campaigns/'
        }),
    })
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useGetLoggedInUserQuery,
    useGetAllCampaignsQuery
} = apiSlice