import { Button, Icon, ListItem, Text, useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { DoCmd } from '../../Api';
import { useUserData } from '../../Util/UserContext';

export const ProductOptionView =({ route, navigation })=>{
    const { Option } = route.params;
    const { theme  } = useTheme();
    const [ loading, setLoading ] = useState(false);
    const { userData: { token }, setUserData } = useUserData();
    const onSaveQuotePress = async ()=>{
        try {
            setLoading(true); 
            const QuotePortalProduct = await DoCmd({ cmd:'QuotePolicy', data:{ policy: { ...Option, id: 0 }, dbMode: false, save: true, action: 'QuotePortalProduct' }, token  });
            if(!QuotePortalProduct.ok){
               console.log(QuotePortalProduct.msg)
               throw QuotePortalProduct.msg;
            }
            setUserData( currentData => ({...currentData, refreshId: new Date().getTime() }))
            navigation.navigate('quoteCompleted', QuotePortalProduct.outData )
        } catch (error) {
            Alert.alert(error);
        }finally{
            setLoading(false)
        }
    }

    return (
        <View style={{ 
            display: 'flex', 
            flex: 1,
            flexDirection: 'column', 
            gap: 10, 
            paddingLeft: 20, 
            paddingRight: 20,
            backgroundColor: 'white' }}>
            <Text h2> { Option.code } </Text>
            <Text style={{ fontWeight: '200' }}> POLICY INFO</Text>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Product:</Text>
                    <Text h4>{Option.productCode }</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>LoB:</Text>
                    <Text h4>{Option.lob }</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Start:</Text>
                    <Text h4>{(Option.start || '').split('T',1).pop() }</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Insured Sum:</Text>
                    <Text h4>{ `${Number(Option.insuredSum || 0 ).toLocaleString() } ${Option.currency}`}</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <Text style={{ color: theme.colors.greyOutline }}>Premium:</Text>
                    <Text h4>{ `${Number(Option.annualTotal || 0 ).toLocaleString() } ${Option.currency}`}</Text>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <Button 
                        title=' Save Quote' 
                        icon={ <Icon name='folder-plus-outline' type='material-community' color={ theme.colors.primary } /> }
                        type='clear'
                        onPress={ onSaveQuotePress }
                        loading={ loading }/>
                </ListItem.Content>
            </ListItem>
        </View>)
}