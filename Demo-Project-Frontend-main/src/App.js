import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  Home,
  Login,
  MarketPlace,
  MyCourse,
  Register,
  SingleCoursePage,
} from './pages'
import './App.css'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { useSelector } from 'react-redux'
import { Header } from './components'

function App() {
  const { loggedInUser } = useSelector((state) => state.user)
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>

        <PrivateRoute path='/home'>
          <Home />
        </PrivateRoute>
        <PrivateRoute path='/market'>
          <MarketPlace />
        </PrivateRoute>
        <PrivateRoute path='/course/:id'>
          <SingleCoursePage />
        </PrivateRoute>
        <PrivateRoute path='/mycourses'>
          <MyCourse />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
