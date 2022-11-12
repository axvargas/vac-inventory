import { ReactNode, useState, useEffect, useLayoutEffect } from 'react';
import { AuthState } from '../interfaces/AuthState';
import { UserAuthContext } from './UserAuthContext';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase'
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'

import { Response } from '../interfaces/Response';

interface UserAuthProviderProps {
  children: JSX.Element | ReactNode | JSX.Element[] | ReactNode[];
}

const UserAuthProvider = ({ children }: UserAuthProviderProps) => {

  const [user, setUser] = useState({} as any)
  const [loading, setLoading] = useState(true)

  const db = getFirestore()

  useEffect(() => {
    const getUserFromFirestore = async (email?: string | null) => {
      const docRef = doc(db, "employee", email || '');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        return {}
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {     
        getUserFromFirestore(currentUser.email).then((user) => {
          console.log('USER:', user)
          setUser({...currentUser, ...user})
          setLoading(false);
        })
      } else {
        console.log('no user')
        setLoading(false);
      }
    })
    return () => unsubscribe()
  }, [])

  const parseError = (errorCode: string):string => {

    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Email not found'
      case 'auth/wrong-password':
        return 'Wrong password'
      default:
        return 'Something went wrong'
    }
  }

  const registerEmployee = async (email: string, password: string, role: string, name: string, lastname: string, id:string) => {
    try {
      const docRef = doc(db, "employee", email);
      await setDoc(docRef, {
        email: email,
        name: name,
        lastname: lastname,
        role: role,
        id: id
      });
    } catch (error) {
      console.log(error)
    }
  }

  const signIn = async (email: string, password: string): Promise<Response> => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return{
        errorCode: null,
        errorMessage: null
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = parseError(errorCode)
      return{
        errorCode,
        errorMessage
      }
    }
  }

  const signOut = async () => {
    try {
      await signOutFirebase(auth)
    } catch (error) {
      console.log(error)
    }
  }
  
  return <UserAuthContext.Provider value={{
    user,
    loading,
    registerEmployee,
    signIn,
    signOut
  }}>
    {children}
  </UserAuthContext.Provider>;
};

export default UserAuthProvider;
