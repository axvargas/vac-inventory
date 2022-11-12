import InformationForm from '../components/InformationForm';
import { Button, Text, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployee';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const Information = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { getEmployeeById, loading, selectedEmployee } = useEmployee()

  const { user } = useAuth();

  useEffect(() => {
    getEmployeeById(user.id)
  }, [])

  return (
    <>
      <Button leftIcon={<IconArrowLeft />} variant="subtle" color="red" onClick={() => navigate('/app')} sx={{ position: 'fixed' }}>
        Back
      </Button>
      <Text fz="xl" ta="center">Information</Text>
      {
        loading ?
          <Center style={{ width: '100%', height: '100%' }}>
            <Loader variant='dots' />
          </Center> :
          selectedEmployee ?
            <InformationForm selectedEmployee={selectedEmployee} /> :
            <Center style={{ width: '100%', height: '100%' }}>
              <Text>Your information was not found</Text>
            </Center> 
      }
    </>
  )
}

export default Information