import React, { useEffect, useState } from 'react';
import { useUserData } from '../../Util/UserContext';
import { FlatList } from 'react-native';
import { Card, useTheme } from '@rneui/themed';
import { ChangeListItem } from './ChangeListItem';

const MobileChanges = [
    { code: 'ChangePolicyCapital', name: 'Sum Insured',     icon: 'euro', iconType: 'material' },
    { code: 'ChangeTotalRescue',   name: 'Total Surrender', icon: 'exclamationcircleo', iconType: 'antdesign' },
    { code: 'ChangeMaturity',      name: 'Maturity',        icon: 'trash-bin-outline', iconType: 'ionicon' },
]
export const ChangeList =({ navigation, route })=>{
    const Policy = route.params;
    const { userData } = useUserData();
    const [ changes, setChanges ] = useState([]);
    const { theme } = useTheme();
    const setAvailableChanges =()=>{
        const { Products } = userData;
        const PolicyProduct = (Products || []).find(pro => pro.code == Policy.productCode );
        if( !PolicyProduct )
            return;
        let policyChanges = MobileChanges.filter( change => !PolicyProduct.config.Main.disabledChanges.some(item => item == change.code));
        setChanges(policyChanges);
    }
    useEffect(()=>{
        setAvailableChanges();
    },[]);
    const onItemPress =({ item })=>{
        navigation.navigate('changeForm',{ change: item, Policy })
    }
    return <Card containerStyle={{ marginTop: 25 }}>
        <FlatList
        data={ changes }
        keyExtractor={ item => item.code }
        style={{ backgroundColor: theme.colors.white }}
        contentContainerStyle={{ backgroundColor: theme.colors.white }}
        renderItem={({ item }) => <ChangeListItem change={ item } onItemPress={ ()=> onItemPress({ item }) } /> } />
    </Card>
}