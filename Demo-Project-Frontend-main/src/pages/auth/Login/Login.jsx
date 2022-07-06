import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { BottomLink } from '../Register/Register-Wrap'
import { addLoggedInUser } from '../../../redux/slices/userSlice'
import { login } from '../../../services'
import { LoginWrap } from './Login_Wrap'

const Login = () => {
  const { push } = useHistory()
  const { loggedInUser } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Something went wrong')
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('required'),
    password: Yup.string().min(6).max(20).required('required'),
  })
  // TODO:loading state
  const handleLogin = async (data) => {
    try {
      setLoading(true)
      const response = await login(data)
      const { accesstoken, refreshtoken } = response.headers
      localStorage.setItem('accesstoken', accesstoken)
      localStorage.setItem('refreshtoken', refreshtoken)
      dispatch(addLoggedInUser(response.data.user))
      push('/home')
    } catch (error) {
      setIsLoginFailed(true)
      setErrorMessage(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsLoginFailed(false)
  }

  React.useEffect(() => {
    loggedInUser._id && push('/home')
  }, [loggedInUser._id])
  return (
    <LoginWrap>
      <Snackbar
        open={isLoginFailed}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form className='form'>
            <h1>Login</h1>
            <div className='form-wrap'>
              <div className='form-control'>
                <Field
                  className='input-field'
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
                  name='email'
                  type='email'
                  label='Email'
                  as={TextField}
                />
              </div>
              <div className='form-control'>
                <Field
                  className='input-field'
                  helperText={touched.password && errors.password}
                  error={touched.password && !!errors.password}
                  name='password'
                  label='Password'
                  type='password'
                  as={TextField}
                />
              </div>
              <Button type='submit' id='login-btn'>
                Login{loading && <CircularProgress />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <BottomLink to='/register'>New here? Get registered</BottomLink>
    </LoginWrap>
  )
}

export default Login
