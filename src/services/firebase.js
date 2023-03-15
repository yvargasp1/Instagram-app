import { func } from 'prop-types'
import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  console.log(result)
  return result.docs.map((user) => user.data().length > 0)
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }))

  return user
}

export async function getsuggestedProfiles(userId, following) {
  console.log(following)
  const result = await firebase.firestore().collection('users').limit(10).get()

  const usersuggest = result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    )

  return usersuggest
}

export async function updateUserFollows(userdocId, profileId, IsFollow) {
  await firebase
    .firestore()
    .collection('users')
    .doc(userdocId)
    .update({
      following: IsFollow
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    })
    .then(function () {
      console.log('updated following', userdocId)
    })
}
export async function updateFollowUser(docId, userId, IsFollow) {
  await firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      followers: IsFollow
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    })
    .then(function () {
      console.log('updated followers', docId)
    })
}

export async function getUsersId(Ids){

   const result = await firebase
     .firestore()
     .collection('users')
     .where('userId', 'in', Ids)
     .get()

    

     const userLikes = result.docs.map((likes) => ({
        ...likes.data(),
      }))

      //console.log('result', userLikes)

      return userLikes

}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following[0].following)
    .get()

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }))

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikePhoto = false

      if (photo.likes.includes(userId)) {
        userLikePhoto = true
      }
      const user = await getUserByUserId(photo.userId)
      const { username } = user[0]

      return { username, ...photo, userLikePhoto }
    })
  )

  return photosWithUserDetails
}


export async function updateLikes(docId, userId, toggleLiked) {
  const update = await firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      likes: toggleLiked
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    })
    .then(function () {
      console.log('updated likes', docId)
    })

   
}