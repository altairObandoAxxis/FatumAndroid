
import { useTheme, Text } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyList, PolicyDetail } from '../Components/Policy';
import { Platform } from 'react-native';
const Stack = createStackNavigator();

const NewProduct =()=> <Text> New Product</Text>

export const PolicyView =()=>{
    const { theme } = useTheme();
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerTintColor: theme.colors.primary,
                headerStyle: { height: 80 } }}>
            <Stack.Group>
                <Stack.Screen 
                    name='index' 
                    component={ PolicyList } 
                    options={{ 
                        headerShown: false,
                    }}
                    />
                <Stack.Screen 
                    name='detail' 
                    component={ PolicyDetail }
                    options={{
                        headerTitle: Platform.OS == 'android' ? 'My Policies': '',
                        headerBackTitle: 'My Policies'
                    }} />
                <Stack.Screen 
                    name='newProduct'
                    component={ NewProduct }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'My Policies': '',
                        headerBackTitle: 'My Policies'
                        }}  />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='modalQuote' component={ PolicyDetail }/>
            </Stack.Group>
        </Stack.Navigator>
    )
}