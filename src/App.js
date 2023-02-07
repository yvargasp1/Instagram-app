import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useAuthListener from './hooks/use-auth-listener'
import * as ROUTES from './constants/routes'
import UserContext from './context/user'

const Login = lazy(() => import('./pages/login'))
const SingUp = lazy(() => import('./pages/singup'))
const NotFound = lazy(() => import('./pages/not-found'))
const Dashboard = lazy(() => import('./pages/dashboard'))

function App() {
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p> Loading..</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />}></Route>
            <Route path={ROUTES.SING_UP} element={<SingUp />}></Route>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />}></Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
