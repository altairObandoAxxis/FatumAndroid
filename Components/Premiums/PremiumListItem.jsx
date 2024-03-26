import { Icon, ListItem, useTheme } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const PremiumListItem =({ item, onItemPress })=>{
    const { theme } = useTheme();
    const estado = item.amount == item.amountPaid ? 'Paid' : 'Not Paid'
    return <TouchableOpacity 
        onPress={ onItemPress } 
        style={{ flex: 1,
            paddingLeft: 20,
            paddingRight: 20,}}>
        <ListItem bottomDivider>
            <Icon 
                size={27}
                type='font-awesome'
                name='dollar'
                color={ theme.colors.primary }/>
            <ListItem.Content>
                <ListItem.Title> Ref { item.id } </ListItem.Title>
                <ListItem.Subtitle>Premium { item.policyCode }</ListItem.Subtitle>
                <ListItem.Subtitle>{ Number(item.amount).toLocaleString() } { item.currency }</ListItem.Subtitle>
                <ListItem.Subtitle>{ estado }</ListItem.Subtitle>
                <ListItem.Subtitle>{ item.dueDate.split('T',1).pop() }</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    </TouchableOpacity>
}