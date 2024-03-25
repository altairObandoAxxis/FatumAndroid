
import { useTheme, Text } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyDetail } from '../Components/Policy/PolicyDetail';
import { PolicyList } from '../Components/Policy/PolicyList';
const Stack = createStackNavigator();

const NewProduct =()=> <Text> New Product</Text>

export const PolicyView =()=>{
    const { theme } = useTheme();
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerTintColor: theme.colors.primary,
                headerStyle: { height: 60 } }}>
            <Stack.Group>
                <Stack.Screen 
                    name='index' 
                    component={ PolicyList } 
                    options={{ 
                        headerShown: false
                    }}
                    />
                <Stack.Screen 
                    name='detail' 
                    component={ PolicyDetail }
                    options={{
                        headerTitle: 'My Policies'
                    }} />
                <Stack.Screen 
                    name='newProduct'
                    component={ NewProduct }
                    options={{ 
                        headerTitle: 'New Product'
                        }}  />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='modalQuote' component={ PolicyDetail }/>
            </Stack.Group>
        </Stack.Navigator>
    )
}