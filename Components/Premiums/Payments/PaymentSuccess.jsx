import { Button, Text, lightColors } from '@rneui/themed';
import React from 'react';
import { Image, View } from 'react-native';
export const PaymentSuccess=({navigation})=><View 
    style={{ 
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10, paddingBottom: 30 }}>
    <Text style={{ flex: 1, textAlign: 'center' }} h3>Payment Confirmation</Text>
    <Image 
        source={require('../../../assets/completed.jpg')}            
        style={{ height: 250, height: 250, borderRadius: 20, resizeMode:'contain', flex: 1, alignSelf: 'center' }}/>
    <View style={{ flex: 1 }}>
        <Text style={{ textAlign:'center', fontWeight: 'bold', fontSize: 18 }}>Payment request was succesfull</Text>
        <Text style={{ textAlign:'center', color: lightColors.greyOutline }}>Thank you for choosing us to walk with you through your coverage journey. A policy receipt has been shared to your email.</Text>
    </View>
    <Button title='Done' onPress={()=> navigation.popToTop() }/>
</View>