import React from 'react'
import { Header } from '../../components'
import Student from './Student/Student'
import Teacher from './Teacher/Teacher'

const MyCourse = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div>
      <Header />
      {user.role === 'teacher' && <Teacher />}
      {user.role === 'student' && <Student />}
    </div>
  )
}

export default MyCourse
