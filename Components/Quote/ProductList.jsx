import { useEffect, useState } from 'react';
import { useUserData } from '../../Util/UserContext';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, useTheme, Text, LinearProgress } from '@rneui/themed';
export const ProductList=({ navigation })=>{
    const [ portalProducts, setPortalProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const { userData } = useUserData();
    const { theme } = useTheme();
    const getPortalProducts = async () => {
       setPortalProducts(userData.Products || []);
    }
    useEffect(()=>{ getPortalProducts() }, []);
    return (
        <View style={{ 
            flex: 1,
            paddingLeft: 20, 
            paddingRight: 20,
            backgroundColor: 'white' }}>
            <Text h2>New Product</Text>
            { loading && <LinearProgress variant='indeterminate' color={theme.colors.primary} />}
            <FlatList
                data={ portalProducts }
                keyExtractor={ item => item.code }
                renderItem={ ({item}) => (
                    <TouchableOpacity onPress={ ()=> navigation.navigate('productForm', item )}>
                        <ListItem containerStyle={{
                                marginBottom: 20, 
                                backgroundColor: '#f4f5f7',
                                borderRadius: 5,
                            }}>
                            <Icon type='ionicon' name='shield-checkmark-outline' color={theme.colors.primary} />
                            <ListItem.Content>
                                <ListItem.Title> <Text style={{ fontWeight: 'bold' }}>{ item.name }</Text></ListItem.Title>
                                <ListItem.Subtitle> Insurance Product </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                )}
                />
        </View>
    )
}