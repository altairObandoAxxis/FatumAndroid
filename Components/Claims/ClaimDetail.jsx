import { Platform, View } from 'react-native'
import { ListItem,Text, useTheme } from '@rneui/themed';

export const ClaimDetail =({ route })=>{
    const Claim = route.params;
    const { theme } = useTheme();
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const estado = Claim.Process && Claim.Process != null ? Claim.Process.estado : (Claim.status || 'No Status');
    return <>
    <View style={{ 
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
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Notification Date: </Text>
                <Text>{ (Claim.notification || '').split('T',1).pop() }</Text>
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
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Status: </Text>
                <Text>{estado}</Text>
            </ListItem.Content>
        </ListItem>
    </View>
    </>
}