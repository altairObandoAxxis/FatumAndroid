
import { useTheme, Text } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyList, PolicyDetail } from '../Components/Policy';
import { ProductForm, ProductList } from '../Components/Quote'
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
                    }}/>
                <Stack.Screen 
                    name='detail' 
                    component={ PolicyDetail }
                    options={{
                        headerTitle: Platform.OS == 'android' ? 'My Policies': '',
                        headerBackTitle: 'My Policies'
                    }} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen 
                    name='newProduct'
                    component={ ProductList }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'Back': '',
                        headerBackTitle: 'Back'
                        }} />
                <Stack.Screen 
                    name='productForm'
                    component={ ProductForm }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'Products': '',
                        headerBackTitle: 'Products'
                        }} />
            </Stack.Group>
            
            
        </Stack.Navigator>
    )
}