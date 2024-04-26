import { Platform, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, ListItem, Text, useTheme } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';

export const PremiumDetail =({ route, navigation })=>{
    const Premium = route.params;
    const { theme } = useTheme();
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const estado = Number(Premium.amountPaid || -1) >= Number(Premium.amount || 0 ) ? (Premium.payDate || '').split('T',1).pop() : 'Not Paid';
    const payed  = Number(Premium.amountPaid || -1) >= Number(Premium.amount || 0 );
    const onPayPress =()=> navigation.navigate('paymentOptions', Premium)
    
    return <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        flexDirection: 'column',
        paddingLeft: 20, paddingEnd: 20,  }}>
        <Text h2> REF { Premium.id }</Text>
        <Text style={{ fontWeight:'100', color: subTitleColor }}>PREMIUM INFO</Text>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Amount: </Text>
                <Text>{ Number(Premium.amount || 0).toLocaleString() } { Premium.currency }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Concept: </Text>
                <Text>{ Premium.concept }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Policy: </Text>
                <Text>{ Premium.policyCode }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Amount Paid: </Text>
                <Text>{ Number(Premium.amountPaid || 0).toLocaleString() } { Premium.currency }</Text>
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
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Contract Year: </Text>
                <Text>{ Premium.contractYear }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Number in year: </Text>
                <Text>{ Premium.numberInYear }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Due Date: </Text>
                <Text>{ Premium.dueDate.split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Id: </Text>
                <Text>{ Premium.id }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Policy Id: </Text>
                <Text>{ Premium.lifePolicyId }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Actions: </Text>
                <Button title='$ Pay' onPress={ onPayPress } disabled={ payed } />
            </ListItem.Content>
        </ListItem>
    </ScrollView>
    </SafeAreaView>
}