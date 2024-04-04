
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { UserProvider } from './Util/UserContext';
import { Main } from './Views/Main';
import { StatusBar } from 'expo-status-bar';
const theme = createTheme({
  lightColors: {
    primary: '#90292a',
  },
  darkColors: {
    primary: '#000',
  },
  mode: 'light',
});



export default function App() {
  return (
      <SafeAreaProvider style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <UserProvider>
            <StatusBar style='auto' />
            <Main />
          </UserProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
