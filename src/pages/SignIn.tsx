import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Alert,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

import { useLocation, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
interface FormValues {
  email: string;
  password: string;
}


const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minHeight: '100vh',
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const schema = Yup.object().shape({
  email: Yup.string().trim().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
});

const SignIn = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/app'

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });
  const [error, setError] = useState('' as string | null);

  const {signIn} = useAuth()

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    const response = await signIn(values.email, values.password, 'employee')
    if(response.errorCode){
      setError(response.errorMessage)
    } else{
      setError('')
      navigate(from, {replace: true})
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        {
          error &&
            <Alert icon={<IconAlertCircle size={16} />} title="Error!" color="red" radius="md" withCloseButton sx={{marginBottom: '12px'}}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
        }
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput 
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button fullWidth mt="xl" size="md" type='submit'>
            Login
          </Button>
        </form>
        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default SignIn