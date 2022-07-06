import {
  Alert,
  Button,
  CardActions,
  CardContent,
  Dialog,
  Popover,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { courseRemover, updateCourse } from '../../services'
import {
  BetterCard,
  BetterTypography,
  ClickableCardMedia,
  DeleteConfirmationWrapper,
  StatusWrapper,
} from './CourseCardWrap'

import { isCourseDeleted } from '../../redux/slices/courseSlice'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Field, Formik } from 'formik'
import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  FlexWrapper,
  FormWrapper,
} from '../../pages/MyCourse/Teacher/TeacherWrap'
import moment from 'moment'
import { isCourseUpdated } from '../../redux/slices/courseSlice'
const CourseCard = ({
  _id,
  title,
  description,
  category,
  price,
  length,
  capacity,
}) => {
  const { push } = useHistory()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [fromTime, setFromTime] = useState(new Date('2014-08-18T09:11:54'))
  const [toTime, setToTime] = useState(new Date('2014-08-18T21:11:54'))

  const { categories } = useSelector((state) => state.category)

  const isTimevalid = () => moment(fromTime).isBefore(toTime)

  const toTimeHandler = (values) => {
    setToTime(values)
  }
  const fromTimeHandler = (values) => {
    setFromTime(values)
  }

  const {
    loggedInUser: { role },
  } = useSelector((state) => state.user)

  let isError = Boolean(errorMessage)

  const isStudent = role === 'student' ? true : false
  const isTeacher = role === 'teacher' ? true : false

  const handleDelete = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = async (data) => {
    try {
      const from = moment(fromTime).format('HH:mm:ss')
      const to = moment(toTime).format('HH:mm:ss')
      const updateReadyCourse = {
        ...data,
        _id,
        availability: { from, to },
      }
      const response = await updateCourse(_id, updateReadyCourse)
      if (response.status === 200) {
        dispatch(isCourseUpdated())
      }
    } catch (error) {
      setErrorMessage('Something went wrong')
    } finally {
      setIsEdit(false)
    }
  }
  const handleDeleteConfirm = async () => {
    try {
      await courseRemover(_id)
      dispatch(isCourseDeleted())
      handleClose()
    } catch (error) {
      setErrorMessage('Could not perform delete! Something went wrong')
      handleClose()
    }
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    isError = false
  }

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
  return (
    <>
      <Dialog
        open={isEdit}
        // disables backdrop close
        // onClose={handleClose}
        maxWidth='md'
        fullWidth
      >
        <Formik
          initialValues={{
            title,
            description,
            length,
            price,
            capacity,
            category: categories[0],
          }}
          validationSchema={validationSchema}
          onSubmit={handleEdit}
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

                <Button type='submit'>Edit</Button>
                <Button onClick={() => setIsEdit(false)}>Cancel</Button>
              </div>
            </FormWrapper>
          )}
        </Formik>
      </Dialog>
      {
        <Snackbar
          open={isError}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      }
      <BetterCard sx={{ maxWidth: 345 }}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <BetterTypography>
            Are you sure you want to delete?
            <DeleteConfirmationWrapper>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleDeleteConfirm}>Yes</Button>
            </DeleteConfirmationWrapper>
          </BetterTypography>
        </Popover>

        <ClickableCardMedia
          component='img'
          height='140'
          image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf6DX9l8pRw9V60TYklqoSluT1xQKaJqRcGg&usqp=CAU'
          alt={title}
          onClick={() => push(`/course/${_id}`)}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography gutterBottom component='div'>
            {category.toUpperCase()}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description.substring(0, 49)}
          </Typography>
        </CardContent>
        {isTeacher && (
          <CardActions>
            <Button size='small' onClick={() => setIsEdit(true)}>
              Edit
            </Button>
            <Button size='small' onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        )}

        {isStudent && <StatusWrapper>enrolled</StatusWrapper>}
      </BetterCard>
    </>
  )
}

export default CourseCard
