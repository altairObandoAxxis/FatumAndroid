import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';
import { AccountAddressList, AccountDetail, AddressDetail } from '../Components/Account';
import { Platform } from 'react-native';
const Stack = createStackNavigator();

export const AccountView=()=>{
    const { theme } = useTheme();
    return (
        <Stack.Navigator
            initialRouteName='account'
            screenOptions={{ 
                headerTintColor: theme.colors.primary,
                headerStyle: { height: 80 }}}>
            <Stack.Screen 
                name='account'
                component={AccountDetail}
                options={{ headerShown: false }}/>
            <Stack.Screen 
                name='addressList'
                component={AccountAddressList}
                options={{ 
                    headerTitle: Platform.OS == 'android' ? 'Account': '',
                    headerBackTitle: 'Account'
                }}/>
            <Stack.Screen 
                name='addressDetail'
                component={ AddressDetail }
                options={{ 
                    headerTitle: Platform.OS == 'android' ? 'Addresses': '',
                    headerBackTitle: 'Addresses'
                }}/>
        </Stack.Navigator>
    )
}