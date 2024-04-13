import { TouchableOpacity  } from 'react-native'
import { Icon, ListItem } from '@rneui/themed';
import { useTheme } from "@rneui/themed";
import { getForegroundColorList, getIconName } from '../../Util/StyleUtil'

export const PolicyListItem =({ item, onItemPress })=>{
    const { theme } = useTheme();
    return <TouchableOpacity disabled={ !item.active }  style={{ 
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        }}
        onPress={()=> item.active ? onItemPress() : console.log('Non Active policy: ' + item.id)}>
        <ListItem bottomDivider>
            <Icon 
                size={27} 
                type='material-community' 
                name={ getIconName(item.end) }
                color={ item.active ? getForegroundColorList({ endDate: item.end, theme }) : theme.colors.greyOutline } /> 
            <ListItem.Content>
                <ListItem.Title>{ item.code } </ListItem.Title>
                <ListItem.Subtitle>{ item.lob } { item.productCode }</ListItem.Subtitle>
                <ListItem.Subtitle>{ Number(item.insuredSum).toLocaleString()} { item.currency }</ListItem.Subtitle>
                <ListItem.Subtitle> From: { item.start.split('T', 1).pop() }</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>  
    </TouchableOpacity>
}
