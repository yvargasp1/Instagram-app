import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function ProtectedRoutes({ user  }) {

 // determine if authorized, from context or however you're doing it

 // If authorized, return an outlet that will render child elements
 // If not, return element that will navigate to login page
 return (user ? <Outlet /> : <Navigate  to={{
                pathname: ROUTES.LOGIN
              }} />)

}

ProtectedRoutes.propTypes={
 user: PropTypes.object,
}
