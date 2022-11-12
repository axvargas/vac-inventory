import { MantineProvider, ColorSchemeProvider, ColorScheme, Paper } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import Navigation from './routes/Navigation';
import UserAuthProvider from './context/UserAuthProvider';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <UserAuthProvider>
          <Navigation />
        </UserAuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
