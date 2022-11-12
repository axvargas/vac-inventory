import { useEffect } from 'react';
import InformationForm from '../components/InformationForm';
import { Button, Loader, Text, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useEmployee } from '../hooks/useEmployee';

const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { selectedEmployee, loading, getEmployeeById } = useEmployee()


  useEffect(() => {
    getEmployeeById(params.id)
  }, [])

  console.log(params, selectedEmployee)

  return (
    <>
      <Button leftIcon={<IconArrowLeft />} variant="subtle" color="red" onClick={() => navigate('/admin-app')} sx={{ position: 'fixed' }}>
        Back
      </Button>
      <Text fz="xl" ta="center">Edit employee</Text>
      {
        loading ?
          <Center style={{ width: '100%', height: '100%' }}>
            <Loader variant='dots' />
          </Center> :
          selectedEmployee ?
            <InformationForm selectedEmployee={selectedEmployee} /> :
            <Center style={{ width: '100%', height: '100%' }}>
              <Text>Employee not found</Text>
            </Center> 
      }
    </>
  )
}

export default EditEmployee