import { View, Image, ImageBackground, Platform } from 'react-native';
import { Button, Text, Icon, useTheme } from '@rneui/themed'
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyCardList } from '../Components/Policy/PolicyCardList';
import { useUserData } from '../Util/UserContext'
import { DoCmd } from '../Api/doCmd';
import { useState, useEffect } from 'react';
import { ProductForm, ProductList, ProductOptList, ProductOptionView } from '../Components/Quote'
import { PolicyDetail } from '../Components/Policy';
const Stack = createStackNavigator();

export const GetStarted =({ navigation })=>{
    const { userData, setUserData } = useUserData();
    const [ policies, setPolicies ] = useState([])
    const fetchUserData =()=>{
        DoCmd({
            cmd: 'LoadEntities', 
            data:{ 
                entity: 'LifePolicy',
                filter: `holderId=${userData.contactId} ORDER BY id DESC `,
                fields: 'id,lob,code,currency,[start],[end], active, insuredSum'
            }, 
            token: userData.token
         })
        .then( LoadEntities => {
            setPolicies((LoadEntities.outData || [] ))
        }).catch(err => console.log(err))
    }
    useEffect(()=>{
        fetchUserData()
    },[userData.contactId]);

    return <View style={{ flex: 1, backgroundColor: 'white'}}>
        <ImageBackground 
            source={require('../assets/landing.png')} 
            resizeMode='cover'
            style={{ flex: 1 }} >
            <View style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'  }}>
                <Image
                    source={require('../assets/fatum.png')} 
                    style={{ resizeMode:'contain', alignSelf:'center', width:100, height: 40 }} />
                <Icon type='font-awesome' name='power-off' color = '#f3712a' style={{ marginRight: 10 }} onPress={ ()=>{
                    console.log('logout');
                    setUserData({...userData, token: null });
                } } />
            </View>
            <View style={{ marginLeft: 15, marginRight: 15, gap: 5 }}>
                <Text h2>My Policies </Text>
                <PolicyCardList
                    dataSource={ policies }
                    navigation={ navigation } />
                <Image
                    source={require('../assets/travelinsurance.png')} 
                    style={{ resizeMode:'contain', alignSelf:'center', width:200, height: 180 }} />
                <Text h3>
                        Protect your next vacation in 3 simple steps
                </Text>
                <Text style={{ padding: 5, fontWeight: '100', fontSize: 18 }}>
                    Vacation insurance is an important consideration during the leisure travel planning process, and it covers the items most critical for individuals on vacation, including emergency assistance, medical coverage, cancellation, travel delays and more
                </Text>
                <Button title='Get Started >' onPress={ ()=> navigation.navigate('newProduct')} />
            </View>            
        </ImageBackground>        
    </View>
}
export const GetStartedView =()=>{
    const { theme } = useTheme();
    return (<Stack.Navigator
        initialRouteName='index'
        screenOptions={{ 
            headerTintColor: theme.colors.primary,
            headerStyle: { height: 80 } }}>
        <Stack.Group>
            <Stack.Screen 
                name='index'
                component={ GetStarted }
                options={{ 
                        headerShown: false,
            }}/>
            <Stack.Screen
                name='policyDetail'
                component={ PolicyDetail }
                options={{ 
                    presentation: 'modal',
                    headerTitle: Platform.OS == 'android' ? 'Get Started': '',
                    headerBackTitle: 'Get Started'
                }}/>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
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
        </Stack.Group>
        </Stack.Navigator>)
}