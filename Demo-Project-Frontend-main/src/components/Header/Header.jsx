import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HeaderWrapper, Logout, WelcomeListItem } from './Header-Wrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { logout } from '../../redux/slices/userSlice'
const Header = () => {
  const {
    loggedInUser: { name },
  } = useSelector((state) => state.user)
  const firstName = name ? name.split(' ')[0] : 'User'

  const { push } = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    push('/')
  }
  return (
    <HeaderWrapper>
      <h1 className='title'>
        <Link to='/home' className='link'>
          Super Tutor
        </Link>
      </h1>
      <ul>
        {/* <li>Home</li> */}
        <li>
          <Link to='/market' className='link'>
            Market Place
          </Link>
        </li>
        <li>
          <Link to='/mycourses' className='link'>
            My Courses
          </Link>
        </li>
        <WelcomeListItem>Welcome {firstName}</WelcomeListItem>
        <Logout onClick={handleLogout}>Logout</Logout>
      </ul>
    </HeaderWrapper>
  )
}

export default Header
