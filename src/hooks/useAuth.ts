import { useContext } from 'react';
import { UserAuthContext } from '../context/UserAuthContext';
export const useAuth = () => {
  return useContext(UserAuthContext)
}