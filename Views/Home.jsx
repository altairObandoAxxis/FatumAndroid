import { useTheme } from '@rneui/themed'
import { useUserData } from '../Util/UserContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';
import { GetStartedView } from './GetStarted';
import { DoCmd } from '../Api/doCmd';
import { useEffect, useState, useRef } from 'react';
import { PolicyView } from './PolicyView';
import { ClaimView } from './ClaimView';
import { PremiumView } from './PremiumView';
import { AccountView } from './AccountView';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { SaveNotificationToken } from '../Api/notifications';

const Tab = createBottomTabNavigator();

const formatBadge =( value ) => {
    if(!value || Number(value || 0) == 0)
        return null;
    let count = Number(value || 0);
    return count > 99 ? '+99' : count.toString()
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS != 'android')
      return;

    Notifications.setNotificationChannelAsync('equity', {
      name: 'equity',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      //console.log(token.data);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token.data;
  }

export const Home =()=>{
    const insets = useSafeAreaInsets();
    const [ expoPushToken, setExpoPushToken] = useState('');
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
        setUserData({...userData })
    },[userData.token, userData.refreshId ])
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    }, []);
    useEffect(()=>{
      if( Platform.OS == 'ios')
        return; 
      if(!expoPushToken || expoPushToken == '')
        return;
      SaveNotificationToken({ 
        userToken: userData.token,
        mobileToken: expoPushToken,
        mobileInfo: `${Device.brand} ${Device.modelName}`,
        platform: Platform.OS.toUpperCase(),
        user: userData.email,
      }).then( response => console.log(response))
    },[expoPushToken])

    return <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'white' }}>
        <Tab.Navigator 
            initialRouteName='Home' 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary }}>
            <Tab.Group>
                <Tab.Screen 
                    name='Home' 
                    component={ GetStartedView }
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
                    component={ AccountView }
                    options={{
                        tabBarIcon:({size, color })=> <Icon type='font-awesome' name='user' size={size} color={color} />}}/>
            </Tab.Group>
        </Tab.Navigator>
    </View>
}