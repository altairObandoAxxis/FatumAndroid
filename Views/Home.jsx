import { Text } from '@rneui/themed'
import { useUserData } from '../Util/UserContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import { GetStarted } from './GetStarted';
import { useDoCmd } from '../Api/login';
import { useEffect } from 'react';

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
    const [ ContactData ] = useDoCmd({cmd: 'GetContactData', data:{ token: userData.token }});
    useEffect(()=>{
        if ( typeof ContactData == 'undefined' || ContactData == null )
            return;
        setUserData({...userData, ContactData })
    }, [ ContactData ])
    return <View style={{ paddingTop: insets.top, flex: 1 }}>
        <Tab.Navigator 
            initialRouteName='Home' 
            screenOptions={{ 
                tabBarActiveTintColor: '#f3712a'}}>
            <Tab.Group>
                <Tab.Screen 
                    name='Home' 
                    component={ GetStarted }
                    initialParams={{ PoliciesAsHolder: ContactData?.PoliciesAsHolder ?? [] }}
                    options={{
                        headerTitle:'',
                        headerLeft: ()=> <Image
                            source={require('../assets/fatum.png')} 
                            style={{ resizeMode:'contain', alignSelf:'center', width:100, height: 30, marginLeft: 10,   }} />,
                        headerRight: ()=> <Icon type='font-awesome' name='power-off' color = '#f3712a' style={{ marginRight: 10 }} onPress={ onUserLogOut } />,
                        tabBarIcon:({size, color })=> <Icon type='antd' name='home' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Policies' component={ Test } 
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
                        tabBarIcon:({size, color })=> <Icon type='ionicons' name='wallet' size={size} color={color} />}}/>
                <Tab.Screen 
                    name='Profile' 
                    component={ Test }
                    options={{
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='user' size={size} color={color} />}}/>
            </Tab.Group>
        </Tab.Navigator>
    </View>
}