import { Button, Text } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { DoCmd } from '../../../Api/doCmd';
import { useUserData } from '../../../Util/UserContext';
import DatePicker from 'react-native-neat-date-picker';

export const MaturityChange =({ Policy, Change })=>{
    const { userData } = useUserData();
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
            const change = { policyId: Policy.id, effectiveDate };
            const ExeChange = await DoCmd({ cmd: Change.code, data: change, token: userData.token });
            if(!ExeChange.ok){
                Alert.alert(ExeChange.msg);
                return;
            }
        } catch (error) {
            console.log(error)
        }finally{
            setQuoting(false)
        }
    }

    let screenHeight = Dimensions.get('window').height;
    return <View style={{...style.container, height: screenHeight }}>
        <DatePicker 
            isVisible={ visible }
            mode='single'
            onCancel={()=> setVisible(false)}
            onConfirm={ onPickerClose }/>
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