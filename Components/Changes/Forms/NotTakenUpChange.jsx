import { Button, Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DoCmd } from '../../../Api/doCmd';
import { useUserData } from '../../../Util/UserContext';
import DatePicker from 'react-native-neat-date-picker';

const DefaultReasons = [
    {name: 'Went to competitor', code: 'COM'},
    {name: 'No Payment', code: 'PAY'},
    {name: 'Other', code: 'OTH'}
]

export const NotTakenUpChange =({ Policy, Change })=>{
    const { userData } = useUserData();
    const [ reasonCode, setReason ] = useState('COM');
    const [ reasons, setReasons ] = useState(DefaultReasons);
    const [ effectiveDate, setEffectiveDate ] = useState(new Date(Policy.nextAnniversary));
    const [ visible, setVisible ] = useState(false);
    const [ quoting, setQuoting ] = useState(false);
    const onPickerClose =( output )=>{
        setVisible(false);
        const newDate = new Date(output.dateString);
        setEffectiveDate(newDate);
    }
    const QuoteChange = async ()=>{
        try {
            setQuoting(true);
            const change = { policyId: Policy.id, effectiveDate, reasonCode };
            const ChangeTotalRescue = await DoCmd({ cmd: Change.code, data: change, token: userData.token });
            if(!ChangeTotalRescue.ok){
                Alert.alert(ChangeTotalRescue.msg)
                return;
            }
        } catch (error) {
            console.log(error)
        }finally{
            setQuoting(false)
        }
    }
    const GetReasons= async ()=>{
        const RepoReasonsCatalog = await DoCmd({cmd:'RepoReasonsCatalog', data:{ operation:'GET', filter:`catalog='TotalRescueChange'` }, token: userData.token });
        if(RepoReasonsCatalog.outData && RepoReasonsCatalog.outData.length > 0){
            setReasons(RepoReasonsCatalog.outData || []);
        }
    }
    useEffect(()=>{GetReasons()},[]);

    let screenHeight = Dimensions.get('window').height;
    return <View style={{...style.container, height: screenHeight }}>
        <DatePicker 
            isVisible={ visible }
            mode='single'
            onCancel={()=> setVisible(false)}
            onConfirm={ onPickerClose }/>
        <Text style={{ marginLeft: 25, marginBottom: 10 }}>SURRENDER REASON</Text>
        <View style={ style.formContainer }>
            <View style={ style.rowContainer }>
                <Text style={{ flex: 1 }}>Reason:</Text>
                <Picker style={{ flex: 2 }} selectedValue={ reasonCode } onValueChange={(itemValue, _)=> setReason(itemValue) }>
                    { reasons.map( item => <Picker.Item key={ item.code } label={ item.name } value={ item.code }/>) }
                </Picker>
            </View>
        </View>
        <Text style={{ marginLeft: 25, marginBottom: 10 }}>EFFECTIVE DATE</Text>
        <View style={style.formContainer }>
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
const formatDate =( date )=> date.toISOString().split('T', 1).pop();