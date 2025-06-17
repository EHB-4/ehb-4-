import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from './config'

// Generic function to get a document
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }
}

// Generic function to get all documents in a collection
export const getCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting collection:', error)
    throw error
  }
}

// Generic function to add/update a document
export const setDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await setDoc(docRef, data, { merge: true })
    return docId
  } catch (error) {
    console.error('Error setting document:', error)
    throw error
  }
}

// Generic function to update a document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, data)
    return docId
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

// Generic function to delete a document
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await deleteDoc(docRef)
    return docId
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// Generic function to query documents
export const queryDocuments = async (
  collectionName: string,
  field: string,
  operator: any,
  value: any,
  orderByField?: string,
  limitCount?: number
) => {
  try {
    let q = query(collection(db, collectionName), where(field, operator, value))
    
    if (orderByField) {
      q = query(q, orderBy(orderByField))
    }
    
    if (limitCount) {
      q = query(q, limit(limitCount))
    }
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error querying documents:', error)
    throw error
  }
} 