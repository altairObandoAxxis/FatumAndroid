import { View, Image, ImageBackground, Platform, ScrollView, Dimensions } from 'react-native';
import { Button, Text, Icon, useTheme } from '@rneui/themed'
import { createStackNavigator } from '@react-navigation/stack';
import { PolicyCardList } from '../Components/Policy/PolicyCardList';
import { useUserData } from '../Util/UserContext'
import { DoCmd } from '../Api/doCmd';
import { useState, useEffect } from 'react';
import { ProductForm, ProductList, ProductOptList, ProductOptionView, QuoteCompleted } from '../Components/Quote'
import { PolicyDetail } from '../Components/Policy';
import { ChangeDetail, ChangeForm, ChangeList, ChangeStatus } from '../Components/Changes';
const Stack = createStackNavigator();

export const GetStarted =({ navigation })=>{
    const { userData, setUserData } = useUserData();
    const { theme } = useTheme()
    
    const getPortalProducts = async () => {
        const GetPortalProducts = await DoCmd({ cmd: 'GetPortalProducts', data:{}, token: userData.token });
        const Products = GetPortalProducts.outData.map(product => ({
            code: product.code,
            name: product.name,
            config: JSON.parse(product.configJson),
        }));
        if( Products.length == 0)
            return;
        setUserData({...userData, Products });
    }
    useEffect(()=>{
        getPortalProducts();
    },[userData.contactId]);
    useEffect(()=>{
        if( typeof userData.refreshId === 'undefined' || userData.refreshId == null)
            return; 
        getPortalProducts();
    },[ userData.refreshId ])
    const height = Dimensions.get('window').height;
    return <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
        <ImageBackground 
            source={require('../assets/landing.png')} 
            resizeMode='cover'
            style={{ flex: 1, height: height  }} >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 50, marginTop: 5 }}>
                <Image
                    source={require('../assets/Equity.png')} 
                    style={{ resizeMode:'stretch', width:60, height: 60 }} />
                <Icon type='font-awesome' name='power-off' color ={ theme.colors.primary } style={{ marginRight: 10, marginTop: 10 }} onPress={ ()=>{
                    setUserData({...userData, token: null });
                } } />
            </View>
            <View style={{ marginLeft: 15, marginRight: 15, gap: 5 }}>
                <Text h2>My Policies </Text>
                <PolicyCardList
                    dataSource={ userData?.Policies ?? []}
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
    </ScrollView>
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
                    headerTitle: Platform.OS == 'android' ? 'Policy Detail': '',
                    headerBackTitle: 'Policy Detail'
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
        </Stack.Navigator>)
}