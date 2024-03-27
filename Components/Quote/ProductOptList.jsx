import { FlatList, View } from 'react-native'
import { ProductOptItem } from './ProductOptItem';
import { Text } from '@rneui/themed';

export const ProductOptList=({ navigation, route })=>{
    const { Options } = route.params;
    return <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <Text h2>Options</Text>
        <FlatList
            data={ Options }
            keyExtractor={ item => item.id }
            renderItem={({item}) => <ProductOptItem 
                item={ item } 
                onOptionSelected={ 
                    ()=> navigation.navigate('productOptionView', { Option: item }) } 
                />}
            />
    </View>
}