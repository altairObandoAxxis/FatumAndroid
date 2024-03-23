import { View, FlatList } from 'react-native';
import { PolicyCard } from './PolicyCard';
import { useState } from 'react';


export const PolicyCardList =({ dataSource })=>{
    const [ showing, setShowing   ] = useState(10);

    const onEndReached = ()=>{
        let newLimit  = showing + 10;
        setShowing(newLimit);
        
    }

    return <FlatList 
        data={ dataSource.slice(0, showing) }
        keyExtractor={ item => item.id }
        horizontal={ true }
        contentContainerStyle={{ height: 160, marginTop: 10 }}
        ListEmptyComponent={ <PolicyCard item={ null }/> }
        onEndReachedThreshold={ 0.8 }
        onEndReached={ onEndReached }
        renderItem={
            ({item}) => <View style={{ width:300, height: 160 }}>
                <PolicyCard item={ item } />
            </View>
        }/>
}