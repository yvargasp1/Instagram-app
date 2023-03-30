import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { getUserByUserId } from '../services/firebase'
import { getPhotosHistory } from '../services/firebase'

export default function usePhotos() {
  const [photos, setPhotos] = useState(null)
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext)

  useEffect(() => {
    async function getTimeLinePhotos() {
      const following = await getUserByUserId(userId)
      let followedUserPhotos = []
      if (following.length) {
        followedUserPhotos = await getPhotosHistory(userId, following)
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
      setPhotos(followedUserPhotos)
    }

    getTimeLinePhotos()
  }, [userId])

  return { photos }
}
