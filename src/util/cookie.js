import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookies = ({ accessToken, refreshToken }) => {
  // 토큰갱신
  const expires = new Date()
  expires.setMinutes(expires.getMinutes() + 30)
  cookies.set('refreshToken', refreshToken, { path: '/' })
  cookies.set('accessToken', accessToken, { path: '/', expires })
  return
}

export const getCookie = token => {
  return cookies.get(token)
}
export const removeCookie = token => {
  return cookies.remove(token)
}
