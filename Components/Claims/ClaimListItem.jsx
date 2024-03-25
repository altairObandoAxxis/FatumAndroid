import { Icon, ListItem, useTheme } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const ClaimListItem =({ item, onItemPress })=>{
    const { theme } = useTheme();
    const estado = item.Process && item.Process != null ? item.Process.estado : (item.status || 'No Status');
    return <TouchableOpacity onPress={ onItemPress } style={{ flex: 1,
        paddingLeft: 20,
        paddingRight: 20,}}>
        <ListItem bottomDivider>
            <Icon 
                size={27}
                type='feather'
                name='alert-triangle'
                color={ theme.colors.primary }/>
            <ListItem.Content>
                <ListItem.Title>{ item.code || 'No Code' } </ListItem.Title>
                <ListItem.Subtitle>{ item.claimType || 'N/A' }</ListItem.Subtitle>
                <ListItem.Subtitle>{ (item.notification || 'No Date').split('T',1).pop()} </ListItem.Subtitle>
                <ListItem.Subtitle>{ estado }</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    </TouchableOpacity>
}