import { FlatList, View } from 'react-native'
import { useUserData } from '../../Util/UserContext'
import { createRef, useEffect, useState } from 'react';
import { Icon, SearchBar, Text, useTheme } from '@rneui/themed';
import { PremiumListItem } from './PremiumListItem';

export const PremiumList =({ navigation })=>{
    const { userData } = useUserData();
    const [ premiums, setPremiums ] = useState([]);
    const [ filter, setFilter ] = useState();
    const { theme } = useTheme();
    const searchBar = createRef();
    // Set data
    useEffect(()=>{
        setPremiums(userData.Premiums);
    },[userData.Premiums])
    // Filter Premiums.
    useEffect(()=>{
        if(!filter || filter == ''){
            setPremiums(userData.Premiums);
            return
        }
        let filteredPremiums = (userData.Premiums || [])
            .filter(item => (item.policyCode || Number(item.lifePolicyId).toString()).toLowerCase().includes( filter.toLowerCase() ));
        setPremiums(filteredPremiums);
    },[filter])
    return <>
        <View style={{ display: 'flex', flexDirection:'row', backgroundColor: 'white', padding: 10}}>
            <Text h2 h2Style={{ fontWeight: 'bold', flex: 1}}>
                My Premiums
            </Text>
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
            data={ premiums }
            keyExtractor={ item => item.id }
            style={{ backgroundColor: theme.colors.white }}
            contentContainerStyle={{ backgroundColor: theme.colors.white }}
            renderItem={({item})=> <PremiumListItem item={item} onItemPress={ ()=> navigation.navigate('detail', item )}  /> }
     />
    </>
}