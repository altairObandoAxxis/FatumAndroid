import { useTheme } from '@rneui/themed'
import { useUserData } from '../Util/UserContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';
import { GetStarted } from './GetStarted';
import { DoCmd } from '../Api/doCmd';
import { useEffect, useState } from 'react';
import { PolicyView } from './PolicyView';
import { ClaimView } from './ClaimView';
import { PremiumView } from './PremiumView';
import { AccountDetail } from '../Components/Account';

const Tab = createBottomTabNavigator();

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
                    Contact : GetContactData.outData.Contact || {},
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
                    component={ ClaimView }
                    options={{
                        tabBarBadge: formatBadge(ContactData?.Claims?.length ?? 0 ),
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='medkit' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Premiums' 
                    component={ PremiumView }
                    options={{
                        tabBarBadge: formatBadge(ContactData?.Premiums?.length ?? 0 ),
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='dollar' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Profile' 
                    component={ AccountDetail }
                    options={{
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='user' size={size} color={color} />}}/>
            </Tab.Group>
        </Tab.Navigator>
    </View>
}