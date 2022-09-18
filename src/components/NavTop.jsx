import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import iPhone from '../../public/assets/iphone.png'
import { Space, Popup, Badge } from 'antd-mobile'
import { Link, useNavigate } from 'react-router-dom'
import { SearchOutline } from 'antd-mobile-icons'
import { ShoppingCartOutlined } from '@ant-design/icons'
import styles from '~/scss/NavTop.module.scss'
import { getCookie } from '../util/cookie'
import {
  useRefreshDataMutation,
  useLogoutMutation
} from '../store/api/userApiSlice'
import { logOut, setUser } from '../store/slices/userSlice'

const notLogin = [
  {
    label: '회원가입',
    route: 'signup'
  },
  {
    label: '로그인',
    route: 'sigin'
  }
]
const logined = [
  {
    label: '회원정보 수정',
    route: 'userdetail'
  },
  {
    label: '관심상품',
    route: 'favorite'
  },
  {
    label: '로그아웃',
    route: 'logout'
  }
]

const NavTop = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = getCookie('accessToken')
  const [refresh] = useRefreshDataMutation()
  const [userLogout] = useLogoutMutation()
  const userName = useSelector(state => state.user).name
  const [visible, setVisible] = useState(false) // pop모달 visible state
  const [options, setOptions] = useState(notLogin)

  // accessToken 유무에 따른 회원정보 수정 및 로그아웃,관심상품 버튼 활성화
  useEffect(() => {
    if (accessToken && userName) {
      setOptions(logined)
    }
  }, [accessToken])

  const logout = () => {
    userLogout()
    dispatch(logOut())
    setOptions(notLogin)
    navigate('/')
  }

  // 로그인 연장
  // unwrap 쿼리로 불러온 비동기 리턴값을 바로 실행 시켜 준다
  const refreshLogin = async () => {
    try {
      const user = await refresh.unwrap()
      dispatch(setUser(user))
    } catch (error) {
      console.log('refresh', error)
      navigate('/signin')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={iPhone} alt='iphone' className={styles.notch} />
        <div className={styles.navbar}>
          {accessToken ? (
            <button className={styles.refresh}>로그인 연장</button>
          ) : null}
          <Space>
            <Link to='/'>
              <SearchOutline
                style={{
                  fontSize: '20px',
                  color: '#888',
                  marginTop: '1px',
                  fontWeight: '700'
                }}
              />
            </Link>
            <Link to='/cart'>
              <Badge>
                <ShoppingCartOutlined
                  style={{
                    fontSize: '22px',
                    color: '#888888',
                    marginTop: '1px'
                  }}
                />
              </Badge>
            </Link>
            <div
              className={styles.lineGroup}
              onClick={() => {
                setVisible(true)
              }}
            >
              <div className={styles.lineTop}></div>
              <div className={styles.lineMiddle}></div>
              <div className={styles.lineBottom}></div>
            </div>
          </Space>
        </div>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        bodyStyle={{
          maxHeight: '60vh',
          backgroundColor: 'transparent'
        }}
      >
        <div className={styles.menuContainer}>
          <div className={styles.menuTitle}>
            {accessToken && userName ? (
              <p>
                <span>{userName} 님, 환영합니다.</span>
                <br /> 오늘의 추천 상품을 확인해보세요!
              </p>
            ) : (
              <p>
                당신만을 위한 맞춤 상품, <br />
                <span>지금 바로 가입해보세요!</span>
              </p>
            )}
          </div>
          {options.map(option => {
            if (options.route === 'logout') {
              return (
                <div
                  className={styles.logout}
                  key={option.route}
                  onClick={() => {
                    logOut()
                    setVisible(false)
                  }}
                >
                  {option.label}
                </div>
              )
            }
            return (
              <div
                key={option.route}
                onClick={() => {
                  setVisible(false)
                }}
              >
                <Link className={styles.menuList} to={option.route}>
                  {option.label}
                </Link>
              </div>
            )
          })}
        </div>
        <div className={styles.modalBtn} onClick={() => setVisible(false)}>
          취소
        </div>
      </Popup>
    </div>
  )
}

export default NavTop
