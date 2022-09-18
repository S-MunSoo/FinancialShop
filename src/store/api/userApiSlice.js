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
    }),
    refreshData: builder.mutation({
      query: () => ({
        url: 'reissue',
        method: 'POST',
        body: {
          accessToken: getCookie('accessToken'),
          refreshToken: getCookie('refreshToken')
        }
      }),
      transformRespones: response => {
        return response.data
      }
    }),
    useDetail: builder.mutation({
      query: data => ({
        url: 'join/detail',
        method: 'POST',
        body: { ...data }
      })
    }),
    detailPass: builder.mutation({
      query: () => ({
        url: 'join/detail-skip',
        method: 'GET'
      })
    }),
    inquireUserData: builder.query({
      query: () => ({
        url: 'members'
      }),
      transformResponse: response => {
        return response.data
      },
      //  invalidatesTags : 이미 존재하는 캐시데이터를 유효하지 않은걸로 판단한다
      invalidatesTags: ['User']
    }),
    editUserData: builder.mutation({
      query: data => ({
        url: 'members',
        method: 'PATCH',
        body: { ...data }
      }),
      // providesTags 는 세가지 데이터를 매개변수로 받아올 수 있다(result ,error , id)
      //post를 보내고 다시 get 해오기 위해서는 tag라는 기능을 사용해야 한다
      // tag: 값요청에 대한 캐시라는 이름이다
      providesTags: ['User']
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        body: {
          accessToken: getCookie('accessToken'),
          refreshToken: getCookie('refreshToken')
        }
      })
    })
  })
})

export const {
  useGetLoginMutation,
  useGetSignUpMutation,
  useRefreshDataMutation,
  useUserDetailMutation,
  useDetailPassMutation,
  useInquireUserDataQuery,
  useEditUserDataMutation,
  useLogoutMutation
} = userApiSlice
