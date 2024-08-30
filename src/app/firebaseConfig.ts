// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'even-ti.firebaseapp.com',
  projectId: 'even-ti',
  storageBucket: 'even-ti.appspot.com',
  messagingSenderId: '783614458961',
  appId: '1:783614458961:web:2def02c15fa9d189410c70',
  measurementId: 'G-3FJT8J541G',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Get a reference to the storage service
const storage = getStorage(app)
const analytics = getAnalytics(app)
export { storage, analytics }
