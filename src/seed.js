/* eslint-disable no-plusplus */
// NOTE: replace 'tIVXcv8Y5ZdJo7DK3uGC2YLSEcw2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
 
  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos-history')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users-history/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!',
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?',
          },
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now(),
      })
  }
}
