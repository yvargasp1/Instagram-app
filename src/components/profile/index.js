import Header from './header'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useReducer } from 'react'
import { getUserPhotosByName, getUsernameExists } from '../../services/firebase'
import Photos from './photos'

export default function UserProfile({username}) {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  }

  const [{ profile, photosCollection, followerCount }, distpatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
   async function getProfileInfoandPhotos() {
    const [user] = await getUsernameExists(username)
    if(username){
     const photos = await getUserPhotosByName(username)
     console.log('photos',photos)

     distpatch({profile:user, photosCollection:photos, followerCount: user.followers.length})
    }


   }
   getProfileInfoandPhotos()

  },[])

  return(
   <>
   <Header
   photosCount={photosCollection ? photosCollection.length : 0}
   profile={profile}
   followerCount={followerCount}
   setFollowerCount={distpatch}
   />
   <Photos photos={photosCollection}/>
   </>
  )
}

UserProfile.propTypes ={
 username:PropTypes.string.isRequired
}
