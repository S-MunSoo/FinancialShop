import { getCookie } from '../../util/cookie'
import { apiSlice } from './apiSlice'

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] })

export const userApiSlice = apiWithTags.injectEndpoints({
  endpoints: builder => ({
    getLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: { email, password }
      }),
      transformRespones: response => {
        return response.data
      },
      //  invalidatesTags : 이미 존재하는 캐시데이터를 유효하지 않은걸로 판단한다
      invalidatesTags: ['User']
    }),
    getSignUp: builder.mutation({
      query: data => ({
        url: 'join',
        method: 'POST',
        body: { ...data }
      })
    })
  })
})

export const { useGetLoginMutation, useGetSignUpMutation } = userApiSlice
