import { useEffect, useState } from 'react';
import { createStyles, Navbar, UnstyledButton } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkIconHidden: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },
    linkTextHidden : {
      display: 'none'
    }
  };
});

const data = [
  { link: '/app', label: 'Notifications', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

const dataAdmin = [
  { link: '/admin-app', label: 'Employees', icon: IconBellRinging },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
];


interface Props {
  opened: boolean;
  admin?: boolean;
}
const NavbarComp = ({admin, opened}: Props) => {

  
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(admin? 'Employees' : 'Notifications');
  const [showText, setShowText] = useState(true);
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(opened == true) {
      setTimeout(() => {
        setShowText(true);
      }, 700);
    } else {
      setShowText(false);
    }
  }, [opened])

  useEffect(() => {
    if(location.pathname == '/app/information') {
      setActive('')
    }else if(location.pathname == '/app') {
      setActive('Notifications')
    }
  }, [location.pathname])
  
  
  const usedData = admin ? dataAdmin : data;
  const links = usedData.map((item) => (
    <UnstyledButton
      component={NavLink}
      to={item.link}
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link)
      }}
    >
      <item.icon className={!opened? classes.linkIconHidden :classes.linkIcon} stroke={1.5} />
      <span className={!showText? classes.linkTextHidden: ''}>{item.label}</span>
    </UnstyledButton>
  ));
  return (
    <Navbar p={'md'} hiddenBreakpoint="sm" hidden={!opened} width={{ sm: opened ? 200 : 80, lg: opened ? 300 : 80 }}
      sx={{
        overflow: "hidden",
        transition: "width 1000ms ease, min-width 1000ms ease"
      }}>
      <Navbar.Section grow>
        {links}
      </Navbar.Section>
    </Navbar>
    
  )
}

export default NavbarComp