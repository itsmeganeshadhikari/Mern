import React, { useState } from 'react'
import CourseCard from '../../../components/CourseCard/CourseCard'
import { studentCourseFetcher } from '../../../services'
import { CardWrapper } from '../CourseContainer/CourseContainerWrap'
import { CourseWrapper } from './StudentWrap'
const Student = () => {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [courseList, setCourseList] = useState([])
  const handleStudentCourse = async () => {
    try {
      const {
        data: { courses },
      } = await studentCourseFetcher()
      setCourseList(courses)
    } catch (error) {
      setErrorMessage('Something went wrong')
      setIsError(true)
    }
  }

  React.useEffect(() => {
    handleStudentCourse()
  }, [])
  return (
    <CardWrapper>
      {courseList.map((item) => (
        <CourseCard key={item._id} {...item}></CourseCard>
      ))}
    </CardWrapper>
  )
}

export default Student
