import NewEmployeeForm from "../components/NewEmployeeForm"
import { Button, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate } from "react-router-dom";

const NewEmployee = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button  leftIcon={<IconArrowLeft />} variant="subtle" color="red" onClick={()=> navigate('/admin-app')}>
        Back
      </Button>
      <Text fz="xl" ta="center">New employee</Text>
      <NewEmployeeForm />
    </>
  )
}

export default NewEmployee