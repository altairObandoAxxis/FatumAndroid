
import { useTheme, Text } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyList, PolicyDetail } from '../Components/Policy';
import { ProductForm, ProductList, ProductOptList, ProductOptionView, QuoteCompleted } from '../Components/Quote'
import { Platform } from 'react-native';
import { ChangeDetail, ChangeForm, ChangeList, ChangeStatus } from '../Components/Changes';
const Stack = createStackNavigator();


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
                <Stack.Screen 
                    name='productOptions'
                    component={ ProductOptList }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'Product Form': '',
                        headerBackTitle: 'Product Form'
                        }} />
                <Stack.Screen 
                    name='productOptionView'
                    component={ ProductOptionView }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'Product Options': '',
                        headerBackTitle: 'Product Options'
                        }} />
                <Stack.Screen 
                 name='quoteCompleted'
                 component={QuoteCompleted}
                 options={{
                    headerTitle: Platform.OS == 'android' ? 'Completed': '',
                    headerBackTitle: 'Completed'
                 }}/>           
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen 
                    name='newChange' 
                    component={ ChangeList }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'Changes': '',
                        headerBackTitle: 'Changes'
                    }} />
                <Stack.Screen
                    name='changeForm'
                    component={ ChangeForm }
                    options={{ 
                        headerTitle: Platform.OS == 'android' ? 'Quote': '',
                        headerBackTitle: 'Quote'
                    }} />
                <Stack.Screen
                    name='changeDetail'
                    component={ ChangeDetail }
                    options={{
                        headerTitle: Platform.OS == 'android' ? 'Cost of Changes': '',
                        headerBackTitle: 'Cost of Changes'
                    }}
                />
                <Stack.Screen 
                 name='changeStatus'
                 component={ ChangeStatus }
                 options={{
                    headerTitle: Platform.OS == 'android' ? 'Result': '',
                    headerBackTitle: 'Result'
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}