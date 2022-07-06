import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({ children, ...rest }) => {
  const { loggedInUser } = useSelector((state) => state.user)

  return (
    <Route
      {...rest}
      render={() => {
        return !loggedInUser ? children : <Redirect to='/' />
      }}
    ></Route>
  )
}

export default PublicRoute
