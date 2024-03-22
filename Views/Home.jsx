import { Text } from '@rneui/themed'
import { useUserData } from '../Util/UserContext'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();
const DefaultHome =()=>{
    const { userData } = useUserData()
    return <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center'}}>
    <Text>Welcome { userData.nombre }</Text>
    <Text>Your email: {userData.email }</Text>
        <Text> Home view </Text>
    </View>
}

const Test =()=><Text>Comming Soon</Text>



export const Home =()=>{
    const insets = useSafeAreaInsets();
    return <View style={{ paddingTop: insets.top, flex: 1 }}>
        <Tab.Navigator 
            initialRouteName='Home' 
            screenOptions={{ 
                tabBarActiveTintColor: '#f3712a', 
                headerTransparent: true,
                headerTitle: '' }}>
            <Tab.Screen 
                name='Home' 
                component={ DefaultHome } 
                options={{
                    tabBarIcon:({size, color })=> <Icon type='antd' name='home' size={size} color={color} />}}/>
            <Tab.Screen 
                name='Policies' component={ Test } 
                options={{
                    tabBarBadge: "25",
                    tabBarIcon:({size, color })=> <Icon type='entypo' name='heart' size={size} color={color} />}}/>
            <Tab.Screen 
                name='Claims' 
                component={ Test }
                options={{
                    tabBarBadge: "1",
                    tabBarIcon:({size, color })=> <Icon type='font-awesome' name='medkit' size={size} color={color} />}}/>
            <Tab.Screen 
                name='Premiums' 
                component={ Test }
                options={{
                    tabBarBadge: "1",
                    tabBarIcon:({size, color })=> <Icon type='ionicons' name='wallet' size={size} color={color} />}}/>
            <Tab.Screen 
                name='Profile' 
                component={ Test }
                options={{
                    tabBarBadge: "1",
                    tabBarIcon:({size, color })=> <Icon type='font-awesome' name='user' size={size} color={color} />}}/>
        </Tab.Navigator>
    </View>
}