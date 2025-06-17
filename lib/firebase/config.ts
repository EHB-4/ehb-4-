import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCkhIM9rR01qYiNEqs7ZhGqEnendeE93tE",
  authDomain: "sample-firebase-ai-app-200d4.firebaseapp.com",
  projectId: "sample-firebase-ai-app-200d4",
  storageBucket: "sample-firebase-ai-app-200d4.appspot.com",
  messagingSenderId: "48919520162",
  appId: "1:48919520162:web:2e8119973ae105158748fb"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app 