import React from 'react';
import { Text } from '@rneui/themed';
import { Image } from 'react-native';
import { ImageBackground, TouchableOpacity, View, StyleSheet } from 'react-native';

export const CreditCardView=({ cardNumber, holderName, month, year })=>{
    const formatCardNumber=(cardNumber)=>{
        let cardText = cardNumber || '',
            formattedString = '',
            index = 0;

        while (index < cardText.length) {
            const endIndex = index + Math.min(4, cardText.length - index);
            const substring = cardText.substring(index, endIndex);
            formattedString += substring;
            if (endIndex !== cardText.length) {
                formattedString += ' ';
            }
            index = endIndex;
        }

        return formattedString.substring(0, 19).toUpperCase();
    }
    const formatMonth=(month) => !month ? '': Number(month || 0).toString().padStart(2,'0');
    const getProviderName=(cardNumber)=>{
        let name = cardNumber || '';
        if(name.startsWith('4'))
            return 'VISA'
        if(name.startsWith('2') || name.startsWith('5'))
            return 'MASTERCARD'
        if(name.startsWith('3'))
            return 'AMERICAN EXPRESS'
        return 'OTHER'
    }
    const getProviderIcon=(cardNumber)=>{
        const VISA = require('../../../assets/visa.png'),
            MASTER = require('../../../assets/mastercard.jpg'),
            AMERICAN= require('../../../assets/american_ex.png');
        let name = cardNumber || '';
        if(name.startsWith('4'))
            return VISA
        if(name.startsWith('2') || name.startsWith('5'))
            return MASTER
        if(name.startsWith('3'))
            return AMERICAN
        return AMERICAN
    }
    return <View style={ style.container }>
    <TouchableOpacity>
        <ImageBackground 
            source={require('../../../assets/cardBackground.jpg')}
            resizeMode='cover'
            style={ style.imageBackgroundStyle }
            imageStyle={{ borderRadius: 25 }}>
            <View style={ style.titleContainer }>
                <Text h4 style={style.textStyle}>{getProviderName(cardNumber)}</Text>
                <Image source={getProviderIcon(cardNumber)} style={ style.imageStyle }/>
            </View>
            <View style={ style.detailContainer }>
                <Text h3 h3Style={style.textStyle}>{ formatCardNumber(cardNumber) }</Text>
                <View style={ style.subDetailContainer }>
                    <View style={{ flex: 1 }}>
                        <Text style={style.textStyle}> Valid up to </Text>
                        <Text style={style.textStyle}> {formatMonth(month)}/{year}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end'}}>
                        <Text style={ style.textStyle }>{ holderName }</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    </TouchableOpacity>
</View>
}

const style= StyleSheet.create({
    container: {
        display:'flex',
        flex: 1,
        padding: 10,
        gap: 10,
    },
    imageBackgroundStyle: { 
        flex: 1, 
        padding: 10,
        minHeight: 200,
    },
    titleContainer:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems:'center',
        padding: 10,
    },
    imageStyle:{ 
        height: 40, 
        width: 60, 
        borderRadius: 5 
    },
    detailContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems:'center',
        padding: 10,
        gap: 10
    },
    subDetailContainer: { 
        display: 'flex', 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        gap: 10,
    },
    textStyle: { color: 'white', flex: 1 }
})