import { Icon, ListItem, Text, useTheme } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';

export const ProductOptItem =({ item, onOptionSelected })=>{
    const { theme } = useTheme();
    return (<TouchableOpacity onPress={ onOptionSelected }>
    <ListItem bottomDivider>
        <Icon type='material-community' name='shield-check-outline' size={27} color={ theme.colors.primary }/>
        <ListItem.Content>
            <Text style={{ fontWeight: 'bold'}}> {`Option ${ item.code }`}</Text>
            <Text>{`${item.lob} ${item.productCode}`}</Text>
            <Text>{`Sum Insured ${Number(item.insuredSum || 0).toLocaleString()} ${item.currency}`}</Text>
            <Text>{`Premium ${Number(item.annualTotal || 0).toLocaleString()} ${item.currency}`}</Text>
        </ListItem.Content>
        <ListItem.Chevron />
    </ListItem>
</TouchableOpacity>)}