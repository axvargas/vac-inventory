import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { Switch, TextInput, Button, Box, Group, Autocomplete, NumberInput,Collapse } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Employee } from '../interfaces/Employee';
import { useEmployee } from '../hooks/useEmployee';
import { useAuth } from '../hooks/useAuth';

const today = new Date();
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
  mobile: Yup.string()
    .trim()
    .notRequired()
    .when('mobile', {
      is: (val: string) => val !== '',
      then: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    }),
  birthdate: Yup.date()
    .nullable()
    .notRequired()
    .when('birthdate', {
      is: (val: Date) => val !== null || val !== undefined || val !== '',
      then: Yup.date().nullable().max(today, 'You cannot be born in the future'),
    }),
  address: Yup.string()
    .trim()
    .notRequired(),
  vac: Yup.boolean(),
  vacbrand: Yup.string()
    .trim()
    .when('vac', {
      is: (val: boolean) => val === true,
      then: Yup.string().required('Please enter the brand of the vaccine dosis'),
    }),
  doses: Yup.number()
    .when('vac', {
      is: (val: boolean) => val === true,
      then: Yup.number()
        .required('Please enter the number of doses')
        .min(1, 'Must be at least 1 dose')
    }),
  vacdate: Yup.date()
    .nullable()
    .when('vac', {
      is: (val: boolean) => val === true,
      then: Yup.date()
        .nullable()
        .required('Please enter the date of application of the vaccine dosis')
        .max(today, 'The date must be in the past')
    }),
}, [['mobile', 'mobile'],['birthdate', 'birthdate']]);

interface InformationFormProps {
  selectedEmployee?: Employee;
}

const InformationForm = ({selectedEmployee}: InformationFormProps ) => {

  const [checked, setChecked] = useState(false);
  const {user} = useAuth()
  const navigate = useNavigate()
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      id: selectedEmployee?.id || '',
      name: selectedEmployee?.name || '',
      lastname: selectedEmployee?.lastname || '',
      email:selectedEmployee?.email || '',
      mobile: selectedEmployee?.mobile || '',
      birthdate: selectedEmployee?.birthdate || null,
      address: selectedEmployee?.address || '',
      vac: selectedEmployee?.vac || false,
      vacbrand: selectedEmployee?.vacbrand || '',
      doses:selectedEmployee?.doses || 0,
      vacdate: selectedEmployee?.vacdate || null,
    },
  });

  const { updateEmployee } = useEmployee();
  const handleSubmit = async (values: Employee) => {
    const to = user.role == 'admin' ? '/admin-app' : '/app'
    const payload: Employee = {
      id: values.id,
      name: values.name,
      lastname: values.lastname,
      email: values.email,
    }
    if(values.mobile !== ''){
      payload['mobile'] = values.mobile;
    }
    if(values.birthdate !== null){
      payload['birthdate'] = values.birthdate;
    }
    if(values.address !== ''){
      payload['address'] = values.address;
    }
    if(values.vac === true){
      payload['vac'] = values.vac;
      payload['vacbrand'] = values.vacbrand;
      payload['doses'] = values.doses;
      payload['vacdate'] = values.vacdate;
    }
    await updateEmployee(payload);
    navigate(to)
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          disabled
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />

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

        <DatePicker
          placeholder="Birthday"
          label="Birthday"
          mt="sm"
          {...form.getInputProps('birthdate')}
        />

        <TextInput
          label="Home address"
          placeholder=""
          mt="sm"
          {...form.getInputProps('address')}
        />
        <TextInput
          label="Mobile phone"
          placeholder="0987496679"
          mt="sm"
          {...form.getInputProps('mobile')}
        />
        <Switch
          sx={{ marginTop: 14, marginBottom: 12 }}
          labelPosition="left"
          label="Are you vaccinated?"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked)
            form.setFieldValue('vac', event.currentTarget.checked);
          }}
        />
        <Collapse in={checked} transitionDuration={500} transitionTimingFunction="linear">   
          <Autocomplete
            withAsterisk
            label="Vaccine brand"
            placeholder="Vaccine brand"
            data={['Sputnik', 'AstraZeneca', 'Pfizer', 'Jhonson&Jhonson']}
            {...form.getInputProps('vacbrand')}
          />
          <NumberInput
            withAsterisk
            label="Dose number"
            placeholder="1"
            mt="sm"
            {...form.getInputProps('doses')}
          />
          <DatePicker
            withAsterisk
            placeholder="Date of the dose"
            label="Date of the dose"
            mt="sm"
            {...form.getInputProps('vacdate')}
          />
        </Collapse>
        <Group position="right" mt="xl">
          <Button type="submit">
            Save changes
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default InformationForm