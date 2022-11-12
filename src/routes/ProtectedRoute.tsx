import { Loader, LoadingOverlay } from '@mantine/core';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRole: string;
}

const ProtectedRoute = ({allowedRole}: ProtectedRouteProps) => {
  const location = useLocation()
  const {user, loading} = useAuth()

  if (loading) {
    return (
      <LoadingOverlay visible={loading} overlayBlur={2} loader={<Loader variant='dots'/>} />  
    )
  }
  const redirectTo = allowedRole === 'admin' ? '/admin' : '/'
  return (
    user.role==allowedRole ? 
      <Outlet /> : 
      user.email ?
        <Navigate to="/unauthorized" state={{from: location.pathname}} /> :
        <Navigate to={redirectTo} state={{from: location}} replace/> 

  )
}

export default ProtectedRoute