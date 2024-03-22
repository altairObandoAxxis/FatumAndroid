import { View, Image, ImageBackground } from 'react-native';
import { Button, Text } from '@rneui/themed'
import { PolicyCardList } from '../Components/PolicyCardList';
import { useUserData } from '../Util/UserContext'
import { useDoCmd } from '../Api/login';


export const GetStarted =()=>{
    const { userData } = useUserData();
    const [ ContactData ] = useDoCmd({cmd: 'GetContactData', data:{ token: userData.token }});
    return <View style={{ flex: 1 }}>        
        <ImageBackground 
            source={require('../assets/landing.png')} 
            resizeMode='cover'
            style={{ flex: 1 }} >
            <View style={{ marginLeft: 15, marginRight: 15, gap: 10 }}>
                <Text h2>My Policies </Text>
                <PolicyCardList
                    dataSource={ ContactData?.PoliciesAsHolder ?? [] } />
                <Image
                    source={require('../assets/travelinsurance.png')} 
                    style={{ resizeMode:'contain', alignSelf:'center', width:200, height: 180 }} />
                <Text h3>
                        Protect your next vacation in 3 simple steps
                </Text>
                <Text style={{ padding: 5, fontWeight: '100', fontSize: 20 }}>
                    Vacation insurance is an important consideration during the leisure travel planning process, and it covers the items most critical for individuals on vacation, including emergency assistance, medical coverage, cancellation, travel delays and more
                </Text>
                <Button title='Get Started >'  />
            </View>            
        </ImageBackground>        
    </View>
}