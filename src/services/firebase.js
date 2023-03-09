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
  const result = await firebase
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
  const result = await firebase
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
