import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface FormValues {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

const schema = Yup.object().shape({
  id: Yup.string()
    .trim()
    .required('Please enter an id')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  name: Yup.string()
    .trim()
    .required("Please enter the required field")
    .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field "),
  lastname: Yup.string()
    .trim()
    .required("Please enter the required field")
    .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field "),
  email: Yup.string().trim().email('Invalid email'),
});

const NewEmployeeForm = () => {
  const navigate = useNavigate()
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      id: '',
      name: '',
      lastname: '',
      email: ''
    },
  });

  const {registerEmployee} = useAuth()

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    await registerEmployee(values.email, '123456', 'employee', values.name, values.lastname, values.id)
    navigate('/admin-app')
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="ID"
          placeholder="0931341762"
          mt="sm"
          {...form.getInputProps('id')}
        />
        <TextInput
          withAsterisk
          label="Names"
          placeholder="John"
          mt="sm"
          {...form.getInputProps('name')}
        />
        <TextInput
          withAsterisk
          label="Last names"
          placeholder="Doe"
          mt="sm"
          {...form.getInputProps('lastname')}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default NewEmployeeForm