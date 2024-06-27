import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://13.53.182.110' }),
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
        getCampaign: builder.query({
            query: (campaign_id) => `/campaigns/${campaign_id}`
        }),
        buyShares: builder.mutation({
            query: ({ campaign_id, accessToken, body }) => ({
                url: `/campaigns/${campaign_id}/participate`,
                method: 'POST',
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: body
            })
        }),

        //wallet
        topUpWallet: builder.mutation({
            query: ({ accessToken, body }) => ({
                url: `/investors/me/wallet/topup`,
                method: 'POST',
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: body
            })
        }),
        withdrawWallet: builder.mutation({
            query: ({ accessToken, body }) => ({
                url: `/investors/me/wallet/withdraw`,
                method: 'POST',
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: body
            })
        }),
        editProfile: builder.mutation({
            query: ({ accessToken, body }) => ({
                url: `/investors/me`,
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${accessToken}`
                },
                body: body
            })
        }),
    })
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useGetLoggedInUserQuery,
    useGetAllCampaignsQuery,
    useGetCampaignQuery,
    useBuySharesMutation,
    useTopUpWalletMutation,
    useWithdrawWalletMutation,
    useEditProfileMutation
} = apiSlice