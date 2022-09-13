import React, { useEffect, useState } from 'react'
import { LockOutline, MailOutline, UserOutline } from 'antd-mobile-icons'
import { Link } from 'react-router-dom'
import styles from '~/scss/SignUpPage.module.scss'
import Decoration from '../deco/Decoration'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/slices/userSlice'
import { useGetSignUpMutation } from '../../store/api/userApiSlice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const SignUp = () => {
  const [name, setName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('naver.com')
  const [direct, setDirect] = useState(true)
  const [submitSignUp] = useGetSignUpMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isOpen = useSelector(state => state.user).modalVisible

  // 회원가입 제출
  const signUp = async () => {
    if (!name || !emailId || !password) {
      dispatch(openModal(true))
      return
    }
    const data = {
      name,
      email: emailId + '@' + email,
      password
    }
    // 로그인 폼 제출시 빈값 초기화 상태 만들기
    try {
      await submitSignUp(data)
      setName('')
      setPassword('')
      setEmail('')
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  // 이메일 disabled 비활성화
  useEffect(() => {
    if (email === '') {
      setDirect(false)
    } else {
      setDirect(true)
    }
  }, [email])

  return (
    <div>
      <div className={styles.signUp}>
        <Decoration />
        <div className={styles.container}>
          <div className={styles.title}>
            <p>나를 위한</p>
            <p>모두를 위한</p>
            <p>더 나은 내일을 향해</p>
            <p>
              오늘부터 <span>SHARE WE?</span>
            </p>
          </div>
          <div className={styles}>
            <div className={styles.input}>
              <label htmlFor='name'>
                <UserOutline />
              </label>
              <input
                type='text'
                name='name'
                placeholder='이름을 입력하세요'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={styles.email}>
              <label htmlFor='email'>
                <MailOutline />
              </label>
              <input
                type='email'
                name='email'
                placeholder='이메일'
                value={emailId}
                onChange={e => setEmailId(e.target.value)}
              />
              <p> @ </p>
              {/* 직접입력 을 위한 direct */}
              <input
                type='email'
                name='email'
                value={email}
                disabled={direct}
                onChange={e => {
                  setEmail(e.target.value)
                }}
              />
              <select
                className={styles.select}
                onChange={e => {
                  setEmail(e.target.value)
                  if (e.target.name === 'direct') {
                    setDirect(true)
                  } else {
                    setDirect(false)
                  }
                }}
                value={email}
              >
                <option>gamil</option>
                <option>naver</option>
                <option>nate</option>
                <option>kakao</option>
                <option name='direct'>직접입력</option>
              </select>
            </div>
            <div className={styles.input}>
              <label htmlFor='password'>
                <LockOutline />
              </label>
              <input
                type='password'
                nmae='password'
                placeholder='비밀번호 6자리 이상'
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
            </div>
          </div>
          <button className={styles.btn} onClick={signUp}>
            가입하기
          </button>
          <p className={styles.gologin}>이미 회원이시라면?</p>
          <Link to='/signin' className={styles.loginbtn}>
            <span>로그인하러 GOGO!</span>
          </Link>
        </div>
        {isOpen ? (
          <Alert
            title={'회원가입 실패'}
            detail={'정보를 모두 입력했는지 확인해주세요.'}
            confirm={'확인'}
          />
        ) : null}
      </div>
    </div>
  )
}

export default SignUp
