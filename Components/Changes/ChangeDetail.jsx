import { Button, Input, Text } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, View, Dimensions, Alert, ScrollView } from 'react-native'
import { useUserData } from '../../Util/UserContext';
import { DoCmd } from '../../Api';

export const ChangeDetail=({ navigation, route })=>{
    const { cmd, Detail } = route.params;
    const [ note, setNote ] = useState();
    const [ code, setCode ] = useState();
    const { userData } = useUserData();
    const [ loading, setLoading ] = useState(false);
    let screenHeight = Dimensions.get('window').height;
    const onSaveChanges =async()=>{
        try {
            setLoading(!loading);
            Detail.operation = 'ADD';
            Detail.note = note;
            Detail.code = code;
            const SaveChange = await DoCmd({ cmd, data: { policyId: Detail.lifePolicyId, ...Detail }, token: userData.token });
            if(!SaveChange.ok){
                Alert.alert(SaveChange.msg);
                return;
            }
            navigation.navigate('changeStatus', SaveChange.outData)
        } catch (error) {
            Alert.alert(error);
        }finally{
            setLoading(!loading);
        }
    }
    return <ScrollView style={{ ...styles.container, height: screenHeight }}>
        <Text style={ styles.sectionTitle }> Options </Text>
        <View style={ styles.formContainer }>
            <Input value={ note } onChangeText={ newValue => setNote(newValue )} placeholder='Optional manual code'/>
            <Input value={ code } onChangeText={ newValue => setCode(newValue )} placeholder='Optional printable change note or remark'/>
            <Button onPress={ onSaveChanges }> Save Changes </Button>
        </View>
        <Text style={ styles.sectionTitle }>Change Bill</Text>
        <View style={{ ...styles.formContainer, gap: 20}}>
            <View style={ styles.rowContainer}>
                <Text>Coverage Premium</Text>
                <Text>{ formatNumber(Detail?.Bill?.coverages ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Surcharges</Text>
                <Text>{ formatNumber(Detail?.Bill?.surcharges ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Discounts</Text>
                <Text>{ formatNumber(Detail?.Bill?.discounts ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Fee</Text>
                <Text>{ formatNumber(Detail?.Bill?.Fee ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Annual premium</Text>
                <Text>{ formatNumber(Detail?.Bill?.anualPremium ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Modal premium</Text>
                <Text>{ formatNumber(Detail?.Bill?.anualPremium ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Tax</Text>
                <Text>{ formatNumber(Detail?.Bill?.tax ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Fiscal Document Number</Text>
                <Text>{ formatNumber(Detail?.Bill?.fiscalNumber ?? '') }</Text>
            </View>
            <View style={ styles.rowContainer}>
                <Text>Annual Total</Text>
                <Text>{ formatNumber(Detail?.Bill?.anualTotal ?? '') }</Text>
            </View>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        columnGap: 25,
        padding: 25
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    sectionTitle: {
        marginLeft: 25, 
        marginBottom: 10,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
const formatNumber =( value )=> Number( value || 0 ).toLocaleString()