import { useLocation, useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
interface FormValues {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().trim().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
});

const SignInAdmin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/admin-app'

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const [error, setError] = useState('' as string | null);

  const { signIn } = useAuth()

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    const response = await signIn(values.email, values.password, 'admin')
    if (response.errorCode) {
      setError(response.errorMessage)
    } else {
      setError('')
      navigate(from, { replace: true })
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {
          error &&
          <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red" radius="md" withCloseButton sx={{ marginBottom: '12px' }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        }
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required 
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default SignInAdmin