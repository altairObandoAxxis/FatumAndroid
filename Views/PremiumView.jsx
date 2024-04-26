import { createStackNavigator } from '@react-navigation/stack';
import { Button, useTheme } from '@rneui/themed';
import { PremiumList, PremiumDetail } from '../Components/Premiums';
import { Platform } from 'react-native';
import { PaymentOptionList, PaymentSuccess, PremiumPay } from '../Components/Premiums/Payments';
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
        <Stack.Screen
            name='paymentOptions'
            component={ PaymentOptionList }
            options={{ 
                headerTitle: Platform.OS == 'android' ? 'Select your payment method': '',
                headerBackTitle: 'Select your payment method'
            }} />
        <Stack.Screen
            name='premiumPay'
            component={ PremiumPay }
            options={{ 
                headerTitle: Platform.OS == 'android' ? 'Payment Form': '',
                headerBackTitle: 'Payment Form'
            }} />
        <Stack.Screen
            name='paymentSuccess'
            component={ PaymentSuccess }
            options={{ 
                headerTitle: Platform.OS == 'android' ? 'Payment Success': '',
                headerBackTitle: 'Payment Success'
            }}/>
        </Stack.Navigator>)
}