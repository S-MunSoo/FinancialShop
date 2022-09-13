import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '../../util/cookie'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  // 헤더에 엑세스토큰을 기본적으로 포함시키기 위한 내부 메소드
  prepareHeaders: headers => {
    const accessToken = getCookie('accessToken')
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  }
})

export const apiSlice = createApi({
  baseQuery,
  endpoints: builder => ({})
})
