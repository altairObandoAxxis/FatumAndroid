import { FlatList, View } from 'react-native'
import { useUserData } from '../../Util/UserContext'
import { createRef, useEffect, useState } from 'react';
import { Icon, SearchBar, Text, useTheme } from '@rneui/themed';
import { ClaimListItem } from './ClaimListItem';

export const ClaimList =({ navigation }) =>{
    const { userData } = useUserData();
    const [ claims, setClaims ] = useState([]);
    const [ filter, setFilter ] = useState();
    const { theme } = useTheme()
    const searchBar = createRef();
    // Set data
    useEffect(()=>{
        setClaims(userData.Claims);
    },[userData.Claims])
    // Filter claims.
    useEffect(()=>{
        if(!filter || filter == ''){
            setClaims(userData.Claims);
            return
        }
        let filteredClaims = (userData.Claims || [])
            .filter(item => (item.code || Number(item.id).toString()).toLowerCase().includes( filter.toLowerCase() ));
        setClaims(filteredClaims);
    },[filter]);
    return <>
        <View style={{ display: 'flex', flexDirection:'row', backgroundColor: 'white', padding: 10}}>
            <Text h2 h2Style={{ fontWeight: 'bold', flex: 1 }}>
                My Claims
            </Text>
            <Icon 
                name='pluscircleo' 
                type='antdesign' 
                color={theme.colors.primary}  
                style={{ flex: 1 }}
                onPress={ ()=> navigation.navigate('newIssue')}/>
        </View>
        <SearchBar
            ref={ searchBar }
            placeholder='Search by code'
            searchIcon={<Icon type='antdesign' name='search1' color={ theme.colors.greyOutline } />}
            clearIcon={<Icon type='antdesign' name='closecircleo' onPress={ ()=> searchBar.current.cancel()} />}
            value={filter}
            onChangeText={ setFilter }
            platform='ios' />
        <FlatList
            data={ claims }
            keyExtractor={item => item.id}
            style={{ backgroundColor: theme.colors.white }}
            contentContainerStyle={{ backgroundColor: theme.colors.white }}
            renderItem={({ item }) => <ClaimListItem item={ item } onItemPress={()=> navigation.navigate('detail', item )} /> }
            />
    </>
}