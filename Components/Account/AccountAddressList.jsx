import { useEffect, useState } from 'react';
import { DoCmd } from '../../Api';
import { useUserData } from '../../Util/UserContext';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, useTheme, Text, LinearProgress } from '@rneui/themed';
export const AccountAddressList =({ navigation, route })=>{
    const { contactId } = route.params;
    const [ loading, setLoading ] = useState(false)
    const { userData }  = useUserData();
    const { theme } = useTheme();
    const [ address, setAddress] = useState([]);
    const GetUpdatedAddress = async()=>{
        setLoading(true);
        let query = `
            SELECT
                address.id,
                address.addressType addressType,
                zip,
                address1,
                address2,
            ISNULL(country.name, '') country,
            ISNULL(state.name, '') state,
            ISNULL(city.name, '') city,
            ISNULL(sector.name, '') sector
            FROM ContactAddress address
            LEFT JOIN CountryCatalog country ON address.country = country.code
            LEFT JOIN StateCatalog   state ON address.state = state.code
            LEFT JOIN CityCatalog    city ON address.city = city.code
            LEFT JOIN SectorCatalog  sector ON address.sector = sector.code
            WHERE address.contactId = ${ contactId }`;
        const DoQuery = await DoCmd({ cmd:'DoQuery', data:{ sql: query }, token: userData.token });
        if( !DoQuery.ok ){
            Alert.alert('Request Error', DoQuery.msg);
            setLoading(!loading)
            return;
        }
        setAddress( DoQuery.outData || []);
        setLoading(false)
    }   
    useEffect(()=>{
        GetUpdatedAddress();
    }, [ contactId ]);
    const IconTypes = {
        Home: <Icon size={24} type='material-community' name='shield-home-outline' color={theme.colors.primary}/>,
        Mailing: <Icon size={24} type='ionicon' name='paper-plane-outline' color={theme.colors.primary}/>,
        Foreign: <Icon size={24} type='ionicon' name='paper-plane-sharp' color={theme.colors.primary}/>,
    }
    return (
        <View style={{ flex: 1, display:'flex', flexDirection: 'column', backgroundColor: 'white'}}>
            { loading && <LinearProgress variant='indeterminate' color={ theme.colors.primary } /> }
            <FlatList
                data={ address }
                keyExtractor={ item => item.id }
                renderItem={({ item })=> <>
                <TouchableOpacity style={{ flex: 1,
                    paddingLeft: 20,
                    paddingRight: 20}}
                    onPress={ ()=> navigation.navigate('addressDetail', item)}>
                    <ListItem bottomDivider>
                        { IconTypes[item.addressType || 'Other'] }
                        <ListItem.Content>
                            <Text>{item.addressType}</Text>
                            <Text > { `${item.country ||''} ${ item.state || ''}`.trim() }  </Text>
                            <Text > { `${item.address2 ||''} ${ item.address1 || ''}`.trim() }  </Text>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
                </>}/>
        </View>
    )
}