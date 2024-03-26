import { Text, useTheme, ListItem } from '@rneui/themed';
import { Platform, View } from 'react-native'
export const AddressDetail =({ route })=>{
    const Address = route.params;
    const { theme } = useTheme();
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const AddressTypeTranslation = {
        Home: 'Thuisadres',
        Mailing: 'Factuuradres',
        Foreign: 'Buitenlands adres',
    };
    const containerStyle = {
        gap: 10, 
        borderRadius: 5, 
        padding: 10,
        backgroundColor: theme.colors.white 
    }
    return <>
    <View style={{ 
        flex: 1,
        flexDirection: 'column',
        gap: 25, 
        padding: 20 }}>
            <View style={containerStyle}>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Address Type</Text>
                <Text> { AddressTypeTranslation[Address.addressType] } </Text>
            </View>
            <View style={containerStyle}>
                <Text style={{ fontWeight:'200', color: subTitleColor }}>Location</Text>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <View style={{ display: 'flex', flexDirection:'row', gap: 25 }}>
                            <Text style={{ fontWeight:'100', color: subTitleColor }}>Country: </Text>
                            <Text>{Address.country}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <View style={{ display: 'flex', flexDirection:'row', gap: 25}}>
                            <Text style={{ fontWeight:'100', color: subTitleColor }}>District: </Text>
                            <Text>{Address.state}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <View style={{ display: 'flex', flexDirection:'row', gap: 25}}>
                            <Text style={{ fontWeight:'100', color: subTitleColor }}>Ressort: </Text>
                            <Text>{Address.city}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <View style={{ display: 'flex', flexDirection:'row', gap: 25}}>
                            <Text style={{ fontWeight:'100', color: subTitleColor }}>Neighbourhood: </Text>
                            <Text>{Address.sector}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
            </View>
            <View style={containerStyle}>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>House Number</Text>
                <Text> { Address.address1 } </Text>
            </View>
            <View style={containerStyle}>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Street</Text>
                <Text> { Address.address2 } </Text>
            </View>
    </View>
    </>
}