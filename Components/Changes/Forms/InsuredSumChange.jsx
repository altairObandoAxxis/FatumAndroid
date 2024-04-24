import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, Dimensions, Alert } from 'react-native';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { DoCmd } from '../../../Api/doCmd';
import { useUserData } from '../../../Util/UserContext';
import DatePicker from 'react-native-neat-date-picker';

const formatDate =( date )=> date.toISOString().split('T', 1).pop();

export const InsuredSumChange =({ Policy, Change, navigation })=>{
    const { theme } = useTheme();
    const [ newCapital, setNewSA ] = useState('0');
    const { userData } = useUserData();
    const [ effectiveDateType, setType ] = useState(1);
    const [ effectiveDate, setEffectiveDate ] = useState(new Date(Policy.nextAnniversary));
    const [ visible, setVisible ] = useState(false);
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const [ quoting, setQuoting ] = useState(false);
    const onSAChange =(newValue)=> setNewSA(newValue);
    useEffect(()=>{
        if( effectiveDateType == 1 )
            setEffectiveDate(new Date(Policy.nextAnniversary))
        else
            setEffectiveDate(new Date())
    }, [effectiveDateType]);

    const onPickerClose =( output )=>{
        setVisible(false);
        const newDate = new Date(output.dateString);
        setEffectiveDate(newDate);
    }
    const QuoteChange = async () =>{
        try {
            setQuoting(true)
            const change = { policyId: Policy.id, newCapital, effectiveDate };
            const ExeChange = await DoCmd({ cmd: Change.code, data: change, token: userData.token });
            if(!ExeChange.ok){
                Alert.alert(ExeChange.msg);
                return;
            }
            navigation.navigate('changeDetail', { Detail: ExeChange.outData, cmd: ExeChange.cmd } )
        } catch (error) {
            console.log(error);
        }finally{
            setQuoting(false);
        }
    }
    let screenHeight = Dimensions.get('window').height

    return <View style={{...style.container, height: screenHeight }}>
            <DatePicker 
                isVisible={ visible }
                mode='single'
                onCancel={()=> setVisible(false)}
                onConfirm={ onPickerClose } />
        <Text style={{ marginLeft: 25, marginBottom: 10 }}>CHANGE OPTIONS</Text>
        <View style={ style.formContainer }>
            <Text style={{ fontWeight:'100', color: subTitleColor, marginLeft: 10 }}>Current Sum Insured:</Text>
            <Input value={ Number(Policy.insuredSum || 0).toLocaleString() } />
            <Input value={ newCapital } onChangeText={ onSAChange } keyboardType='decimal-pad' placeholder='New Sum Insured' />
        </View>
        <Text style={{ marginLeft: 25, marginBottom: 10 }}>EFFECTIVE DATE</Text>
        <View style={style.formContainer }>
            <View style={ style.rowContainer }>
                <Text style={{ flex: 1 }}>From:</Text>
                <Picker style={{ flex: 2 }} selectedValue={ effectiveDateType } onValueChange={(itemValue, _)=> setType(itemValue) }>
                    <Picker.Item label='Next Anniversary' value={1} />
                    <Picker.Item label='Custom' value={0} />
                </Picker>
            </View>
            <View style={ style.rowContainer }>
                <Text>Select a date: </Text>
                <Button onPress={()=> setVisible(true)} type='clear'>{ formatDate(effectiveDate) }</Button>
            </View>
        </View>
        <Button onPress={QuoteChange} loading={ quoting }> Quote </Button>
    </View>
}

const style= StyleSheet.create({
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
        marginBottom: 30
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})