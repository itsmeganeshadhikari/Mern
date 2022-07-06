import React, { useState } from 'react'
import { Formik, Field, Form, useField } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { BottomLink, RegisterWrap } from './Register-Wrap'
import { register } from '../../../services/index'
import { updateRegistrationStatus } from '../../../redux/slices/userSlice'

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(3, 'Too Short!')
    .max(55, 'Too Long!'),
  email: Yup.string().email().required('Required'),
  password: Yup.string()
    .min(6, 'Must be atleast six characters')
    .max(20, 'Must not be more than twenty characters')
    .required('Required'),
  repeatPassword: Yup.string()
    .required('Required')
    .oneOf(
      [Yup.ref('password'), null],
      'Password and Repeat Password does not match'
    ),
  role: Yup.string().required('Required').lowercase(),
})

const Register = () => {
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [registerFailed, setRegisterFailed] = useState(false)

  const handleRegistration = async (data) => {
    try {
      const status = await register(data)
      if (status === 201) {
        dispatch(updateRegistrationStatus(true))
        push('/')
      }
    } catch (error) {
      setRegisterFailed(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setRegisterFailed(false)
  }
  return (
    <RegisterWrap>
      <Snackbar
        open={registerFailed}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          User Registration failed!
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          repeatPassword: '',
          role: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegistration}
      >
        {({ errors, touched }) => (
          <Form className='form'>
            <h3>Register</h3>
            <div className='form-wrap'>
              <div className='form-control'>
                <Field
                  className='input-field'
                  helperText={touched.name && errors.name}
                  error={touched.name && !!errors.name}
                  name='name'
                  label='Full Name'
                  as={TextField}
                />
              </div>
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
                <MySelect className='input-field' name='role' id='role'>
                  <option value=''>Select a role</option>
                  <option value='student'>Student</option>
                  <option value='teacher'>Teacher</option>
                </MySelect>
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
              <div className='form-control'>
                <Field
                  className='input-field'
                  helperText={touched.repeatPassword && errors.repeatPassword}
                  error={touched.repeatPassword && !!errors.repeatPassword}
                  name='repeatPassword'
                  label='Repeat Password'
                  type='password'
                  as={TextField}
                />
              </div>

              <div className='form-control'>
                <Button type='submit' variant='contained' id='register-btn'>
                  Register
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <BottomLink to='/'>Already registered? Login</BottomLink>
    </RegisterWrap>
  )
}

export default Register
