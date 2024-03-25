import { View } from "react-native"
import { ListItem, Switch, Text, useTheme } from "@rneui/themed";

export const PolicyDetail = ({ route })=> {
    const Policy = route.params;
    const { theme } = useTheme();
    return <View style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        flexDirection: 'column',
        paddingLeft: 20, paddingEnd: 20,  }}>
        <Text h2>{ Policy.code || Policy.id }</Text>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: theme.colors.greyOutline }}>POLICY INFO</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' , alignItems: 'center' }}>
                    <Text style={{ flex: 1}}>{ Policy.active ? 'Active': 'Inactive'}</Text>
                    <Switch value={ Policy.active } style={{ flex: 1}}/>
                </View>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: theme.colors.greyOutline }}>ID: </Text>
                <Text>{ Policy.id }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: theme.colors.greyOutline }}>LOB: </Text>
                <Text>{ Policy.lob }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: theme.colors.greyOutline }}>Start: </Text>
                <Text>{ Policy.start.split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: theme.colors.greyOutline }}>End: </Text>
                <Text>{ (Policy.end || '').split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: theme.colors.greyOutline }}>Insured Sum: </Text>
                <Text>{ Number(Policy.insuredSum).toLocaleString() } { Policy.currency }</Text>
            </ListItem.Content>
        </ListItem>
    </View>
}