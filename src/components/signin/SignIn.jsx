import React from 'react'
import Decoration from '../deco/Decoration'
import { LockOutline, MailOutline } from 'antd-mobile-icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '~/scss/SignIn.module.scss'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/slices/userSlice'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isOpen = useSelector(state => state.user).modalVisible

  return (
    <div className={styles.signIn}>
      <Decoration />
      <div className={styles.container}>
        <div className={styles.title}>
          <p>언제까지 내일로 미뤄?</p>
          <p>늦었다 생각할 때가</p>
          <p>가장 빠른 법!</p>
          <p>
            오늘부터 <span>SHARE WE!</span>
          </p>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.input}>
            <label name='email'>
              <MailOutline />
            </label>
            <input
              type='email'
              name='email'
              placeholder='이메일'
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor='password'>
              <LockOutline />
            </label>
            <input
              type='password'
              name='password'
              placeholder='비밀번호'
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
          </div>
        </div>
        <button className={styles.btn}>로그인</button>
        <p className={styles.goSignUp}>SHARE WE가 처음이신가요?</p>
        <Link to='/signup' className={styles.signupbtn}>
          <span>Share We?</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
