import { useContext } from 'react'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import * as ROUTES from '../constants/routes'
import { getAuth, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)
  const auth = getAuth()
  const history = useNavigate()
  console.log('user', user)
  return (
    <header className='h-16 bg-white border-b border-gray-primary mb-8 '>
      <div className='container mx-auto max-w-screen-lg h-full'>
        <div className='flex justify-between h-full'>
          <div
            className='text-gray-700 text-center flex items-center 
         cursor-pointer
         '
          >
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src='/images/logo.png'
                  alt='Instagram'
                  className='mt-2 w-6/12'
                />
              </Link>
            </h1>
          </div>
          <div className='text-gray-700 text-center flex items-center mr '>
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Link>

                <button
                  type='button'
                  title='Salir'
                  className='p-5'
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        history(ROUTES.LOGIN)
                      })
                      .catch((error) => {
                        console.log(error)
                      })
                  }}
                  onKeyDown={(event) => {
                    if (event === 'Enter') {
                      console.log('ENTER')
                      firebase.auth().signOut()
                    }
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z'
                      clipRule='evenodd'
                    />
                    <path
                      fillRule='evenodd'
                      d='M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <div className='flex items-center cursor-pointer'>
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName}`}
                      className='rounded-full h-8 w-8 flex'
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type='button'
                    className='bg-blue-500 text-white w-full h-7 font-bold rounded mb-5 mr-2 py-1 px-2 text-sm'
                  >
                    Ingresar
                  </button>
                </Link>
                <Link to={ROUTES.SING_UP}>
                  <button
                    type='button'
                    className=' text-black w-full h-7 font-bold rounded mb-5 mr-2 py-1 px-2 text-sm'
                  >
                    Registrarse
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
