import { Text, useTheme } from '@rneui/themed'
import { useUserData } from '../Util/UserContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';
import { GetStarted } from './GetStarted';
import { DoCmd } from '../Api/doCmd';
import { useEffect, useState } from 'react';
import { PolicyView } from './PolicyView';

const Tab = createBottomTabNavigator();
const Test =()=><Text>Comming Soon</Text>

const formatBadge =( value ) => {
    if(!value || Number(value || 0) == 0)
        return null;
    let count = Number(value || 0);
    return count > 99 ? '+99' : count.toString()
}

export const Home =({ onUserLogOut })=>{
    const insets = useSafeAreaInsets();
    const { userData, setUserData } = useUserData();
    const [ ContactData, setData ]  = useState();
    const { theme } = useTheme();
    const fetchUserData =()=>{
        DoCmd({cmd: 'GetContactData', data:{ token: userData.token }, token: userData.token })
        .then( GetContactData => {
            setData((GetContactData.outData || {} ));
            if( GetContactData.outData ){
                setUserData({
                    ...userData, 
                    contactId: GetContactData.outData.Contact.id,
                    Policies:  GetContactData.outData.PoliciesAsHolder || [],
                    Claims:    GetContactData.outData.Claims || [],
                    Premiums:  GetContactData.outData.Premiums || [],
                 })
            }
        }).catch(err => console.log(err))
    }
    useEffect(()=>{
        fetchUserData();
        setUserData({...userData, onUserLogOut, refreshBadges: fetchUserData })
    },[userData.token])

    return <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
        <Tab.Navigator 
            initialRouteName='Home' 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary }}>
            <Tab.Group>
                <Tab.Screen 
                    name='Home' 
                    component={ GetStarted }
                    options={{
                        headerTitle:'',
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='home' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Policies' component={ PolicyView } 
                    options={{
                        tabBarBadge: formatBadge(ContactData?.PoliciesAsHolder?.length ?? 0 ),
                        tabBarIcon:({size, color })=> <Icon type='entypo' name='heart' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Claims' 
                    component={ Test }
                    options={{
                        tabBarBadge: formatBadge(ContactData?.Claims?.length ?? 0 ),
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='medkit' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Premiums' 
                    component={ Test }
                    options={{
                        tabBarBadge: formatBadge(ContactData?.Premiums?.length ?? 0 ),
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='dollar' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Profile' 
                    component={ Test }
                    options={{
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='user' size={size} color={color} />}}/>
            </Tab.Group>
        </Tab.Navigator>
    </View>
}