import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const { loggedInUser } = useSelector((state) => state.user)
  return (
    <Route
      {...rest}
      render={() => {
        return loggedInUser._id ? children : <Redirect to='/' />
      }}
    ></Route>
  )
}

export default PrivateRoute
