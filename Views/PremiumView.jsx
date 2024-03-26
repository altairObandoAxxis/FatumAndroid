import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';
import { PremiumList, PremiumDetail } from '../Components/Premiums';
import { Platform } from 'react-native';
const Stack = createStackNavigator();

export const PremiumView =()=>{
    const { theme } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerTintColor: theme.colors.primary,
                headerStyle: { height: 80 }
            }}>
        <Stack.Screen 
            name='premium' 
            component={ PremiumList }
            options={{ headerShown: false }}/>
        <Stack.Screen
            name='detail'
            component={ PremiumDetail }
            options={{ 
                headerTitle: Platform.OS == 'android' ? 'My Premiums': '',
                headerBackTitle: 'My Premiums'
            }} />
        </Stack.Navigator>)
}