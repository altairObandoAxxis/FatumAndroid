import { Button, Input } from '@rneui/themed';
import React, { createRef, useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { CreditCardView } from './CreditCardView';


export const CreditCardForm=({ callBack, loading })=>{
    const [ cardNumber, setCardNumber ] = useState();
    const [ holder, setHolderName ] = useState();
    const [ month, setMonth ] = useState();
    const [ year, setYear ] = useState();
    const [ cvv, setCVC] = useState();
    const cardRef = createRef(),
          holdRef = createRef(),
          montRef = createRef(),
          yearRef = createRef(),
          cvcRef  = createRef();

    const onSubmit =()=>{
        if(!cardNumber || cardNumber.length < 16){
            Alert.alert('The card number is not completed');
            cardRef.current.shake();
            cardRef.current.focus();
            return;
        }
        if(!month || month.length < 2){
            Alert.alert('Check Month value');
            montRef.current.shake();
            montRef.current.focus();
            return;
        }
        if(!year || year.length < 2){
            Alert.alert('Check Year value');
            yearRef.current.shake();
            yearRef.current.focus();
            return;
        }
        if(!cvv || cvv.length < 2){
            Alert.alert('Check CVC value');
            cvcRef.current.shake();
            cvcRef.current.focus();
            return;
        }
        const formData = { cardNumber, holder, month, year, cvv };
        if(typeof callBack === 'function')
            callBack(formData);
        else
            console.log(formData);
    }
    return <ScrollView style={ style.container }>
        {loading && <ActivityIndicator />}
        <CreditCardView 
        cardNumber={ cardNumber}
        holderName={ holder }
        month={month}
        year={year} />
        {/* Form */ }
        <View style={{ flex: 2, }}>
            <Input ref={ cardRef } maxLength={19} keyboardType='number-pad' value={ cardNumber } onChangeText={newValue => setCardNumber(newValue)} placeholder='Card Number'/>
            <Input ref={ holdRef } keyboardType='default' value={ holder } onChangeText={newValue => setHolderName(newValue)} placeholder='Holder Name'/>
            <Input ref={ montRef } maxLength={2} keyboardType='number-pad' value={ month } onChangeText={newValue => setMonth(newValue)} placeholder='Month'/>
            <Input ref={ yearRef } maxLength={4} keyboardType='number-pad' value={ year } onChangeText={newValue => setYear(newValue)} placeholder='Year'/>
            <Input ref={ cvcRef } maxLength={4} keyboardType='number-pad' value={ cvv } onChangeText={newValue => setCVC(newValue)} placeholder='CVC'/>
        </View>
        <Button title={'Submit'} onPress={ onSubmit } disabled={ loading } loading={ loading }/>
    </ScrollView>
}
const style= StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 10
    }
})