import { createStackNavigator } from '@react-navigation/stack';
import { ClaimList, ClaimDetail } from '../Components/Claims';
import { useTheme } from '@rneui/themed';
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
            options={{ title: 'My Claims'}} />
        </Stack.Navigator>)
}