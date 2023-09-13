import Header from './header'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useReducer } from 'react'
import {

  getUsernameExists,
  
} from '../../services/firebase'
import Photos from './photos'
import { ref, getStorage, listAll, getDownloadURL } from 'firebase/storage'

export default function UserProfile({ username }) {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  }
  const [image, setImage] = useState('')

  const [{ profile, followerCount }, distpatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    async function listImages() {
      const [user] = await getUsernameExists(username)
      const storage = getStorage()
      const listRef = ref(storage, 'images/')
      listAll(listRef)
        .then((res) => {
          res.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImage((prev) => [...prev, url])
            })
          })
           distpatch({
             profile: user,
             photosCollection: image,
             followerCount: user.followers.length,
           })
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    listImages()
  
  }, [])

  return (
    <>
      {image.length ? (
        <>
          <Header
            photosCount={image ? image.length : 0}
            profile={profile}
            followerCount={followerCount}
            setFollowerCount={distpatch}
            username={username}
          />
          <Photos photos={image} />
        </>
      ) : (
        console.log('err')
      )}
    </>
  )
}

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
}
