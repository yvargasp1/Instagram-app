import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import * as ROUTES from './constants/routes'
const Login = lazy(() => import('./pages/login'))

const SingUp = lazy(() => import('./pages/singup'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p> Loading..</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
          <Route path={ROUTES.SING_UP} element={<SingUp />}></Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
