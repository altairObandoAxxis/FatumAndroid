import { Platform, View } from 'react-native'
import { ListItem, Switch, Text, useTheme } from '@rneui/themed';

export const PolicyDetail = ({ route })=> {
    const Policy = route.params;
    const { theme } = useTheme();
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    return <View style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        flexDirection: 'column',
        paddingLeft: 20, paddingEnd: 20,  }}>
        <Text h2>{ Policy.code || Policy.id }</Text>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>POLICY INFO</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' , alignItems: 'center' }}>
                    <Text style={{ flex: 1}}>{ Policy.active ? 'Active': 'Inactive'}</Text>
                </View>
            </ListItem.Content>
            <Switch value={ Policy.active } style={{ flex: 1}}/>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>ID: </Text>
                <Text>{ Policy.id }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>LOB: </Text>
                <Text>{ Policy.lob }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Start: </Text>
                <Text>{ Policy.start.split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>End: </Text>
                <Text>{ (Policy.end || '').split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Insured Sum: </Text>
                <Text>{ Number(Policy.insuredSum).toLocaleString() } { Policy.currency }</Text>
            </ListItem.Content>
        </ListItem>
    </View>
}