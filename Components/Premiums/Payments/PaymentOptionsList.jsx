import React, { useEffect, useState } from 'react';
import { useUserData } from '../../../Util/UserContext';
import { getPaymentMethods } from '../../../Api/Payments';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { Icon, ListItem, Text, lightColors, useTheme } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const PaymentOptionList=({ route, navigation})=>{
    const Premium = route.params;
    const { userData } = useUserData();
    const [ paymentOptions, setPaymentOptions ] = useState([]);
    const [ loading, setLoading ] = useState(false)
    const { theme } = useTheme();
    useEffect(()=>{
        setLoading(true);
        getPaymentMethods(Premium.id, userData.Products, userData.token)
        .then(methods => {
            const newOptions = (methods || []).map((item, index) =>({id: index, ...item}));
            setPaymentOptions(newOptions);
        }).finally( ()=> setLoading(false));
    },[])
    return <View style={style.container }>
        { loading && <ActivityIndicator />}
        <FlatList
            contentContainerStyle={ style.containerList }
            refreshing={ loading }
            data={ paymentOptions }
            keyExtractor={ item => item.id }
            renderItem={({ item }) => <TouchableOpacity onPress={()=> navigation.navigate('premiumPay', { PayOption: item, Premium })}>
                <ListItem>
                    <View style={ style.iconRounded }>
                        <Icon type={ item.control == 'creditCardForm'?'antdesign':'ionicon'} name={ item.control == 'creditCardForm' ? 'creditcard' : 'shield-checkmark-outline'} color={ theme.colors.primary } size={ 24 } />
                    </View>
                    <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>}
            />
    </View>
}
const style=StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        gap: 25,
        backgroundColor:'white',
    },
    containerList:{
        gap: 15,
        padding: 10,
        borderRadius: 15,
    },
    iconRounded:{
       backgroundColor:  lightColors.disabled,
       padding: 5,
       borderRadius: 20,
    }
})