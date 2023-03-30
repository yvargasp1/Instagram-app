import Firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import {seed, seedDatabase} from '../seed'

const config = {
  apiKey: 'AIzaSyDbuZ5bHn4xzZO6nLS--grfhr4_N0bohPM',
  authDomain: 'instagram-4f43d.firebaseapp.com',
  projectId: 'instagram-4f43d',
  storageBucket: 'instagram-4f43d.appspot.com',
  messagingSenderId: '397002140418',
  appId: '1:397002140418:web:781ca886b65d14024b701b',
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

//console.log('firebase', firebase)

//Agregar datos a firebase
/* seedDatabase(firebase) */
export { firebase, FieldValue }
