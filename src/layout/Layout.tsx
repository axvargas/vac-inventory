import HeaderBar from '../components/HeaderBar';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import NavbarComp from '../components/NavbarComp';
import EmployeeProvider from '../context/EmployeeProvider';

interface Props {
  admin?: boolean;
}

const Layout = ({ admin }: Props) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={<NavbarComp admin={admin} opened={opened} />}
      header={<HeaderBar admin={admin} opened={opened} toggle={toggle} />}
    >
      <EmployeeProvider>
        <Outlet />
      </EmployeeProvider>
    </AppShell>
  )
}

export default Layout