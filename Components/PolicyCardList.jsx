import { View, FlatList } from 'react-native';
import { PolicyCard } from './PolicyCard';


export const PolicyCardList =({ dataSource, refreshing })=>(
    <FlatList 
        data={ (dataSource || []).filter(item => item.active) }
        keyExtractor={ item => item.id }
        horizontal={ true }
        contentContainerStyle={{ height: 160, marginTop: 10 }}
        ListFooterComponent={ null }
        ListEmptyComponent={ <PolicyCard item={ null }/>}
        renderItem={
            ({item}) => <View style={{ width:300, height: 160 }}>
                <PolicyCard item={ item } />
            </View>
        }/>
)