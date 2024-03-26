import { createStackNavigator } from '@react-navigation/stack';
import { ClaimList, ClaimDetail } from '../Components/Claims';
import { useTheme } from '@rneui/themed';
import { Platform } from 'react-native';
const Stack = createStackNavigator();

export const ClaimView =()=>{
    const { theme } = useTheme();
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerTintColor: theme.colors.primary,
                headerStyle: { height: 80 }
            }}>
        <Stack.Screen 
            name='claim' 
            component={ ClaimList }
            options={{ headerShown: false }}/>
        <Stack.Screen
            name='detail'
            component={ ClaimDetail }
            options={{ 
                headerTitle: Platform.OS == 'android' ? 'My Claims': '',
                headerBackTitle: 'My Claims'}}/>
        </Stack.Navigator>)
}