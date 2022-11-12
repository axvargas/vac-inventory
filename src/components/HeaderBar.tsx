import { useState } from 'react';
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Header,
  Loader
} from '@mantine/core';
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import LightDarkButton from './LightDarkButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },
  userName: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

}));

interface HeaderTabsProps {
  admin?: boolean;
  opened: boolean;
  toggle: () => void;
}


const HeaderBar = ({ admin, opened, toggle }: HeaderTabsProps) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();

  const { user, loading, signOut } = useAuth();

  const handleSignOut = () => {
    const {role} = user;
    const to = role == 'admin' ? '/admin' : '/';
    signOut();
    navigate(to);
  };
  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <MantineLogo size={28} />
        </Group>
        <Group>
          <LightDarkButton />
          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar radius="xl" size={20} />
                  {
                    loading ? <Loader size="sm" variant='dots' /> :(
                      <Text className={classes.userName} weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                        {`${user?.name} ${user?.lastname}`}
                      </Text>
                    )
                  }
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} stroke={1.5}/>} onClick={()=> !admin && navigate('information')}>Account information</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />} onClick={handleSignOut}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Header>
  )
}

export default HeaderBar