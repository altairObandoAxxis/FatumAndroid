import React, { useState } from 'react';
import { Alert } from 'react-native';
import { CreditCardForm } from './CreditCardForm';
import { Text } from '@rneui/themed';
import { HtmlForm } from '../../Util/HtmlForm';
import { DoCmd } from '../../../Api/doCmd';
import { useUserData } from '../../../Util/UserContext';
export const PremiumPay =({ route, navigation })=>{
    const { PayOption, Premium } = route.params;
    const [ loading, setLoading ]=useState(false);
    const { userData:{ token }, setUserData } = useUserData();
    const onSubmitForm = async(formData)=>{
        if( !PayOption.chain ){
            Alert.alert('No endpoint configured');
            return;
        }
        try {
            setLoading(true)
            const data = {...formData,currency: Premium.currency, lifePolicyId: Premium.lifePolicyId, paymentId: Premium.id };
            const ExeChain = await DoCmd({cmd:'ExeChain', data:{ chain: PayOption.chain, context: JSON.stringify(data)}, token });
            if(!ExeChain.ok)
                throw ExeChain.msg;
            const Response = ExeChain.outData;
            if(!Response.ok)
                throw Response.msg;
            // Update Payment item. 
            setUserData( current => ({...current, refreshId: new Date().getTime() }));
            navigation.navigate('paymentSuccess', Response);
        } catch (error) {
            Alert.alert(error);
        }finally{
            setLoading(false);
        }
    }
    if( PayOption.control == 'creditCardForm')
        return <CreditCardForm callBack={ onSubmitForm } loading={ loading }/>
    if( PayOption.control == 'htmlForm')
        return <HtmlForm 
            html={ PayOption.htmlForm }
            loading={ loading }
            additionalContext={
                `function getPremiumDetails(){ 
                    return {
                        id:${ Premium.id },
                        lifePolicyId:${ Premium.lifePolicyId },
                        currency: '${ Premium.currency }',
                        amount: ${ Premium.amount || 0 },
                        amountPaid: ${ Premium.amountPaid || 0 }
                    }
                }`
            }/>
    return <Text>Configuration not found</Text>
}