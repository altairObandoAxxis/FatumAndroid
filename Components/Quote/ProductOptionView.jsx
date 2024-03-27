import { ListItem, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';

export const ProductOptionView =({ route })=>{
    const { Option } = route.params;
    const { theme  } = useTheme();
    return (
        <View style={{ 
            display: 'flex', 
            flex: 1,
            flexDirection: 'column', 
            gap: 10, 
            paddingLeft: 20, 
            paddingRight: 20,
            backgroundColor: 'white' }}>
            <Text h2> { Option.code } </Text>
            <Text style={{ fontWeight: '200' }}> POLICY INFO</Text>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Product:</Text>
                    <Text h4>{Option.productCode }</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>LoB:</Text>
                    <Text h4>{Option.lob }</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Start:</Text>
                    <Text h4>{(Option.start || '').split('T',1).pop() }</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Insured Sum:</Text>
                    <Text h4>{ `${Number(Option.insuredSum || 0 ).toLocaleString() } ${Option.currency}`}</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Premium:</Text>
                    <Text h4>{ `${Number(Option.annualTotal || 0 ).toLocaleString() } ${Option.currency}`}</Text>
                </ListItem.Content>
            </ListItem>
        </View>)
}