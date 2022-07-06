import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Header, Footer } from '../../components'
import LinkChain from '../../components/LinkChain/LinkChain'
import { enrollRequestSender, getSingleCourse } from '../../services'
import {
  BetterBox,
  BetterButton,
  DescriptionWrapper,
  TitleWrapper,
} from './SingleCourse-Wrap'
import CourseImage from './CourseImage'
import { CourseContent, SingleCourseWrapper } from './SingleCourse-Wrap'
import { useSelector } from 'react-redux'
import { OvalBox } from '../../components/styled'
import { Alert, Snackbar } from '@mui/material'

const SingleCoursePage = () => {
  const { id } = useParams()
  const [isError, setIsError] = useState(false)
  const [course, setCourse] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [isEnrollSuccess, setIsEnrollSuccess] = useState(false)
  const {
    loggedInUser: { role },
  } = useSelector((state) => state.user)

  const isStudent = role === 'student' ? true : false

  const courseFetcher = async () => {
    try {
      const response = await getSingleCourse(id)
      setCourse(response.data.course[0])
    } catch (error) {
      setIsError(true)
      setErrorMessage('Something went wrong')
    }
  }

  React.useEffect(() => {
    courseFetcher()
  }, [])

  const enrollRequestHandler = async () => {
    try {
      const response = await enrollRequestSender(id)
      response.status === 200 && setIsEnrollSuccess(true)
    } catch (error) {
      setErrorMessage('Something went wrong')
      setIsError(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setIsEnrollSuccess(false)
  }
  return (
    <>
      <Header />
      <LinkChain />

      {isError && (
        <div
          style={{ textAlign: 'center', minHeight: '70vh', margin: '0 auto' }}
        >
          {errorMessage}
        </div>
      )}
      <Snackbar
        open={isEnrollSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Successfully sent enroll request
        </Alert>
      </Snackbar>

      {!isError && (
        <SingleCourseWrapper>
          <CourseImage />
          {course && (
            <CourseContent>
              <TitleWrapper>{course?.title}</TitleWrapper>
              {course && course.courseCategory && (
                <OvalBox>{course.courseCategory[0].name.toUpperCase()}</OvalBox>
              )}
              <p>Price:${course?.price}</p>
              <p>Length:{course?.length} hour</p>

              <p>
                Time:
                <span>
                  {/* {moment(course?.availability?.from).format('LTS')} */}

                  {course?.availability?.from}
                  <span> to </span>
                  <span>{course?.availability?.to}</span>
                </span>
              </p>

              {course && course.courseOwner && isStudent && (
                <p style={{ textTransform: 'capitalize' }}>
                  Creator: {course.courseOwner[0].name}
                </p>
              )}
              {course && course.students && (
                <p>Enrolled students:{course.students.length}</p>
              )}
              <p>Student limit: {course?.capacity}</p>
              <DescriptionWrapper>{course?.description}</DescriptionWrapper>
            </CourseContent>
          )}
        </SingleCourseWrapper>
      )}

      {isStudent && (
        <BetterBox>
          <BetterButton onClick={enrollRequestHandler}>
            Send Enroll Request
          </BetterButton>
        </BetterBox>
      )}
      <Footer />
    </>
  )
}

export default SingleCoursePage
