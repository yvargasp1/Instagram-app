import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'

import UseContext from '../context/user'

import { getUserByUserId } from '../services/firebase'

export default function useUser() {
  const [activateUser, setActivateUser] = useState({})

  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      const response = await getUserByUserId(user.uid)
      setActivateUser(response)
    }

    if (user?.uid) {
      getUserObjByUserId()
    }
  }, [user])

  return{user:activateUser}
}
