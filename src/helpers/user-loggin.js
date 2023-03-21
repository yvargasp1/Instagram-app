import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function IsUserLoggedIn({ user }) {
  // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return (user ? (
    <Navigate
      to={{
        pathname: ROUTES.DASHBOARD,
      }}
    />
  ) : (
    <Outlet />
  ))
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.object,
}
