import { ActivityIndicator, Alert, Platform, View } from 'react-native'
import { ListItem,Text, useTheme } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { DoCmd } from '../../Api/doCmd'
import { useUserData } from '../../Util/UserContext';

export const ClaimDetail =({ route })=>{
    const Claim = route.params;
    const { theme } = useTheme();
    const { userData: { token } } = useUserData();
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const estado = Claim.Process && Claim.Process != null ? Claim.Process.estado : (Claim.status || 'No Status');
    const [ eventReason, setEventReason ] = useState();
    const [ insuredEvent, setInsuredEvent ] = useState();
    const [ isLoading, setIsLoading] = useState(false);
    const fetchEventReasonAndInsuredEvent =async()=>{
        setIsLoading(true)
        try {
            let RepoEventReasonCatalog  = await DoCmd({cmd:'RepoEventReasonCatalog',data:{ operation:'GET',filter:`code='${Claim.eventReason}'` },token});
            let RepoInsuredEventCatalog = await DoCmd({cmd:'RepoInsuredEventCatalog',data:{ operation:'GET',filter:`code='${Claim.insuredEvent}'` },token});
            setEventReason(RepoEventReasonCatalog.outData && RepoEventReasonCatalog.outData.length > 0 ? RepoEventReasonCatalog.outData[0].name : Claim.eventReason)
            setInsuredEvent(RepoInsuredEventCatalog.outData && RepoInsuredEventCatalog.outData.length > 0 ? RepoInsuredEventCatalog.outData[0].name : Claim.insuredEvent)
        } catch (error) {
            Alert.alert(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchEventReasonAndInsuredEvent();
    },[])
    return <>
    {isLoading && <ActivityIndicator />}
    {!isLoading && <View style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        flexDirection: 'column',
        paddingLeft: 20, paddingEnd: 20,  }}>
        <Text h2>{ (Claim.code || Number(Claim.id).toString()) }</Text>
        <Text style={{ fontWeight:'100', color: subTitleColor }}>CLAIM INFO</Text>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>ID: </Text>
                <Text>{ Claim.id }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Code: </Text>
                <Text>{ Claim.code }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Policy Number: </Text>
                <Text>{ Claim.policyCode }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Notification Date: </Text>
                <Text>{ (Claim.notification || '').split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Date of Occurrence: </Text>
                <Text>{ (Claim.occurrence || '').split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Claim Type: </Text>
                <Text>{ Claim.claimType }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Insured Sum: </Text>
                <Text>{estado}</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Event Reason: </Text>
                <Text>{eventReason}</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Insured Event: </Text>
                <Text>{insuredEvent}</Text>
            </ListItem.Content>
        </ListItem>
    </View>}
    </>
}