import { FlatList, View } from 'react-native'
import { useUserData } from '../../Util/UserContext'
import { createRef, useEffect, useState } from 'react';
import { Icon, SearchBar, Text, useTheme } from '@rneui/themed';
import { PolicyListItem } from './PolicyListItem';

export const PolicyList =({ navigation })=>{
    const { userData } = useUserData();
    const [ policies, setPolicies ] = useState([]);
    const [ filter, setFilter ] = useState();
    const { theme } = useTheme();
    const searchBar = createRef();
    // Set data
    useEffect(()=>{
        setPolicies(userData.Policies.sort( (a,b)=> a.active == b.active ? 0 : a.active ? -1 : 1));
    },[userData.Policies])
    // Filter policies.
    useEffect(()=>{
        if(!filter || filter == ''){
            setPolicies(userData.Policies);
            return
        }
        let filteredPolicies = (userData.Policies || [])
            .filter(item => (item.code || Number(item.id).toString()).toLowerCase().includes( filter.toLowerCase() ));
        setPolicies(filteredPolicies);
    },[filter])
    return <>
        <View style={{ display: 'flex', flexDirection:'row', backgroundColor: 'white', padding: 10}}>
            <Text h2 h2Style={{ fontWeight: 'bold', flex: 1}}>
                My Policies
            </Text>
            <Icon 
                name='pluscircleo' 
                type='antdesign' 
                color={theme.colors.primary}  
                style={{ flex: 1 }}
                onPress={ ()=> navigation.navigate('newProduct')}/>
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
            data={ policies }
            keyExtractor={ item => item.id }
            style={{ backgroundColor: theme.colors.white }}
            contentContainerStyle={{ backgroundColor: theme.colors.white }}
            renderItem={({item})=> <PolicyListItem item={item} onItemPress={ ()=> navigation.navigate('detail', item )}  /> }
     />
    </>
}