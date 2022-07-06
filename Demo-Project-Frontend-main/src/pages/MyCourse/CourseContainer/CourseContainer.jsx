import React, { useState } from 'react'
import { teacherCourses } from '../../../services'
import CourseCard from '../../../components/CourseCard/CourseCard'
import { CardWrapper } from './CourseContainerWrap'
import { useSelector } from 'react-redux'

const CourseContainer = () => {
  const [allCourse, setAllCourse] = useState([])
  const { courseDeleted, courseCreated, courseUpdated } = useSelector(
    (state) => state.course
  )

  const courseFetcher = async () => {
    try {
      const {
        data: { courses },
      } = await teacherCourses()
      setAllCourse(courses)
    } catch (error) {
      console.log(error)
    }
  }

  //   TODO:Add pagination
  React.useEffect(() => {
    courseFetcher()
  }, [courseDeleted, courseCreated, courseUpdated])
  return (
    <CardWrapper>
      {allCourse.map((course) => (
        <CourseCard key={course._id} {...course}></CourseCard>
      ))}
    </CardWrapper>
  )
}

export default CourseContainer
