import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  Snackbar,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import * as yup from 'yup'
import React, { useState } from 'react'
import TimePicker from '@mui/lab/TimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { Field, Formik } from 'formik'
import {
  FlexWrapper,
  FormWrapper,
  TeacherWrapper,
  ButtonWrapper,
  BetterButton,
} from './TeacherWrap'
import { coursePusher } from '../../../services'
import CourseContainer from '../CourseContainer/CourseContainer'
import { isCourseCreated } from '../../../redux/slices/courseSlice'

const Teacher = () => {
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [fromTime, setFromTime] = useState(new Date('2014-08-18T09:11:54'))
  const [toTime, setToTime] = useState(new Date('2014-08-18T21:11:54'))
  const { categories } = useSelector((state) => state.category)
  // const [timeError, setTimeError] = useState(false)
  const [courseCreationSuccess, setCourseCreationSuccess] = useState(false)

  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .min(4, 'Too short')
      .max(50, 'Too long')
      .required('Required'),
    description: yup
      .string()
      .required('Required')
      .min(10, 'Too Short')
      .max(455, 'Too long')
      .trim(),
    price: yup
      .number()
      .positive()
      .required('Required')
      .min(1, 'Cannot be zero and negative'),
    capacity: yup
      .number()
      .positive()
      .required('Required')
      .min(1, 'Should be atleast one')
      .integer(),
    length: yup.number().required('Required').positive(),
  })

  const handleCreateCourse = async (data) => {
    const from = moment(fromTime).format('HH:mm:ss')
    const to = moment(toTime).format('HH:mm:ss')
    const course = { ...data, availability: { from, to } }
    try {
      const response = await coursePusher(course)
      response.status === 201 && setCourseCreationSuccess(true)
      dispatch(isCourseCreated())
    } catch (error) {
      setIsError(true)
      setErrorMessage('Something went wrong')
    } finally {
      setOpenModal(false)
    }
  }

  // fromTime and toTime validatior
  const isTimevalid = () => moment(fromTime).isBefore(toTime)

  const toTimeHandler = (values) => {
    setToTime(values)
  }
  const fromTimeHandler = (values) => {
    setFromTime(values)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setCourseCreationSuccess(false)
  }
  return (
    <TeacherWrapper>
      {loading && <CircularProgress />}
      {!loading && isError && <p>{errorMessage}</p>}

      {!loading && !isError && (
        <>
          <ButtonWrapper>
            <Button
              onClick={() => {
                setOpenModal(true)
              }}
            >
              Create a course
            </Button>
          </ButtonWrapper>
          <Snackbar
            open={courseCreationSuccess}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Course created Successfully
            </Alert>
          </Snackbar>

          <Dialog
            open={openModal}
            // disables backdrop close
            // onClose={handleClose}
            maxWidth='md'
            fullWidth
          >
            <Formik
              initialValues={{
                title: '',
                description: '',
                length: '',
                price: '',
                capacity: '',
                category: categories[0],
              }}
              validationSchema={validationSchema}
              onSubmit={handleCreateCourse}
            >
              {({ errors, touched }) => (
                <FormWrapper className='form'>
                  <div className='form-wrap'>
                    <div className='form-control'>
                      <Field
                        className='input-field'
                        helperText={touched.title && errors.title}
                        error={touched.title && !!errors.title}
                        name='title'
                        type='text'
                        label='Title'
                        as={TextField}
                      />
                    </div>
                    <div className='form-control'>
                      <Field
                        className='input-field'
                        helperText={touched.price && errors.price}
                        error={touched.price && !!errors.price}
                        name='price'
                        label='Price'
                        type='number'
                        as={TextField}
                      />
                    </div>
                    <div className='form-control'>
                      <Field
                        className='input-field'
                        helperText={touched.capacity && errors.capacity}
                        error={touched.capacity && !!errors.capacity}
                        name='capacity'
                        label='Max Students Intake'
                        type='number'
                        as={TextField}
                      />
                    </div>
                    <div className='form-control'>
                      <Field
                        className='input-field'
                        helperText={touched.length && errors.length}
                        error={touched.length && !!errors.length}
                        name='length'
                        label='Length'
                        type='number'
                        as={TextField}
                      />
                    </div>

                    <FlexWrapper>
                      <div className='form-control'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label='From'
                            name='from'
                            value={fromTime}
                            onChange={fromTimeHandler}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                helperText={
                                  !isTimevalid()
                                    ? 'From cannot be greater than to'
                                    : null
                                }
                                error={!isTimevalid()}
                              />
                            )}
                            className='input-field'
                          />
                        </LocalizationProvider>
                      </div>
                      <div className='form-control'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label='To'
                            name='to'
                            value={toTime}
                            onChange={toTimeHandler}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                helperText={
                                  !isTimevalid()
                                    ? 'To cannot be less than from'
                                    : null
                                }
                                error={!isTimevalid()}
                              />
                            )}
                            className='input-field'
                          />
                        </LocalizationProvider>
                      </div>
                      <div className='form-control'>
                        <Field
                          id='select-field'
                          name='category'
                          as='select'
                          // multiple={true}
                          className='input-field'
                        >
                          {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                              {cat.toUpperCase()}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </FlexWrapper>
                    <div className='form-control'>
                      <Field
                        name='description'
                        id='description-field'
                        className='input-field'
                        // TODO:Causing warning in console
                        // helperText={touched.description && errors.description}
                        // error={touched.description && !!errors.description}
                        placeholder='Course description'
                        type='text'
                        as={TextareaAutosize}
                      />
                    </div>

                    <Button type='submit'>Add</Button>
                    <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                  </div>
                </FormWrapper>
              )}
            </Formik>
          </Dialog>
        </>
      )}

      <CourseContainer />
    </TeacherWrapper>
  )
}

export default Teacher
