import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FirebaseContext from '../context/firebase'
import * as ROUTES from '../constants/routes'
import { doesUsernameExists } from '../services/firebase'

export default function SingUp() {
  const history = useNavigate()
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')

  const { firebase } = useContext(FirebaseContext)
  const [emailAddress, setEmailAdress] = useState('')

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isInvalid = password === '' || emailAddress === ''

  const handleSingUp = async (event) => {
    event.preventDefault()

    const usernameExists = await doesUsernameExists(username)

    console.log(usernameExists.length)
    if (usernameExists.length == 0) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password)
        /* 
        await firebase.createdUser.updateProfile({
          displayName: username,
        }) */

        await firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          username: username.toLowerCase(),
          fullName: fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        })

        history(ROUTES.LOGIN)
      } catch (error) {
        setFullname('')
        setUsername('')
        setEmailAdress('')
        setPassword('')
        setError(error)
        console.log(error)
      }
    } else {
      setError('Ya existe el usuario.')
    }

    console.log(usernameExists)
  }

  useEffect(() => {
    document.title = 'SingUp -Instagram'
  }, [])

  return (
    <div className='container flex mx-auto items-center h-screen'>
      <div className='flex w-[10%]'></div>
      <img
        src='/images/iphone-with-profile.jpg'
        alt='Iphone'
        className='max-w-[30%]'
      />
      <div className='flex flex-col w-[25%]'>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary  rounded mb-5'>
          <h1 className='flex justify-center w-full'>
            <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 w-6/12 mb-4'
            />
          </h1>

          {error && <p className='mb-4 text-xs text-red-400'>{error}</p>}

          <form onSubmit={handleSingUp} method='POST'>
            <input
              aria-label='Ingresa tu usuario'
              type='text'
              placeholder='Username'
              className='text-left text-sm text-gray-base w-full mr-2 py-5 px-5 h-2
            border border-gray-primary rounded mb-5
            '
              onChange={({ target }) => setUsername(target.value)}
            />

            <input
              aria-label='Ingresa tu nombre completo'
              type='text'
              placeholder='Fullname'
              className='text-left text-sm text-gray-base w-full mr-2 py-5 px-5 h-2
            border border-gray-primary rounded mb-5
            '
              onChange={({ target }) => setFullname(target.value)}
            />

            <input
              aria-label='Ingresa tu email'
              type='text'
              placeholder='Email address'
              className='text-left text-sm text-gray-base w-full mr-2 py-5 px-5 h-2
            border border-gray-primary rounded mb-5
            '
              onChange={({ target }) => setEmailAdress(target.value)}
            />
            <input
              aria-label='Ingresa tu clave'
              type='password'
              placeholder='Password'
              className='text-left text-sm text-gray-base w-full mr-2 py-5 px-5 h-2
            border border-gray-primary rounded mb-5
            '
              onChange={({ target }) => setPassword(target.value)}
            />

            <button
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-500 text-white w-full h-8 font-bold rounded mb-5 mr-2 py-1 px-2 text-sm
            ${isInvalid && `opacity-50`}
            `}
            >
              Registrarse
            </button>
          </form>
        </div>
        <div
          className='flex justify-center items-center flex-col w-full p-4 border rounded
      bg-white border-gray-primary
      '
        >
          <p className='text-sm text-grey-primary'>
            Tiene una cuenta ? {``}
            <Link to='/login' className='font-bold text-black'>
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
