import { firebase, FieldValue } from '../lib/firebase'
import {ref, uploadBytes, getStorage} from "firebase/storage"

export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  console.log(result)
  return result.docs.map((user) => user.data().length > 0)
}

export async function getUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  const user = result.docs.map((user) => ({ ...user.data(), docId: user.id }))

  return user
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

export async function getFollowingProfiles(userId, following) {
  console.log('getFollowingProfiles', userId, following)
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', 'in', following)
    .get()

  const result2 = await firebase
    .firestore()
    .collection('photos-history')
    .where('userId', 'in', following)
    .get()

  let array = []
  const usersuggest = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }))

  const usersuggestf = result2.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }))

  for (let i = 0; i < usersuggest.length; i++) {
    for (let j = 0; j < usersuggestf.length; j++) {
      if (usersuggest[i].userId == usersuggestf[j].userId) {
        array.push(usersuggest[i])
         j = usersuggestf.length
      }
    }
  }

 console.log('-->', array, usersuggest,usersuggestf)



  return array
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

export async function getUsersId(Ids) {
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

export async function getPhotosHistory(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos-history')
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
  await firebase
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

export async function updateComments(docId, displayName, comment) {
  await firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion({ displayName, comment }),
    })
    .then(function () {
      console.log('updated comments', docId)
    })
}

export async function getUserIdByUsername(username) {
  const user = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  const result = user.docs.map((r) => ({ ...r.data() }))
  return result[0].userId
}

export async function getUserPhotosByName(username) {
  if (username) {
    const userId = await getUserIdByUsername(username)
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get()

    const photos = result.docs.map((r) => ({ ...r.data() }))

    return photos
  }
}

export async function isUserFollowingProfile(LoggedInUser, profileUserId) {
  console.log('LoggedInUser, profileUserId', LoggedInUser, profileUserId)
  const r = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', LoggedInUser)
    .where('following', 'array-contains', profileUserId)
    .get()

  const [rs = {}] = r.docs.map((item) => ({
    ...item.data(),
  }))
  console.log('rs', rs)

  return rs.userId
}

export async function toggleFollow(
  isFollowing,
  activeUserDocId,
  profileDocId,
  followingUserId,
  followerUserId
) {
  console.log(
    'docs :',
    isFollowing,
    activeUserDocId,
    profileDocId,
    followingUserId
  )
  await updateUserFollows(activeUserDocId, followingUserId, isFollowing)
  await updateFollowUser(profileDocId, followerUserId, isFollowing)

  console.log('toggleFollowUpdate')
}

export async function uploadImage(image){
  const storage =  getStorage()
  
    console.log('Upload')
    const imageRef =  ref(storage,`images/${image.name}`)
    uploadBytes(imageRef, image).then(function () {
      console.log('Upload Image')
    })
  
}
