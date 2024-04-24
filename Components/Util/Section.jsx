import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

export const Section=({ title, children, containerStyle={} })=> <View style={containerStyle}>
    <Text style={style.sectionTitle}>{ title }</Text>
    <View style={ style.formContainer}>
        {children}
    </View>
</View>

const style= StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    sectionTitle: {
        marginLeft: 25, 
        marginBottom: 10,
    },
})