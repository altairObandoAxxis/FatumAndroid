import { Button, Icon, Text } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

export const IssueCreated =({ route, navigation })=>{
    const newIssue = route.params;
    return <View style={{ flex: 1, padding: 25 }}>
        <View style={ style.container }>
            <Text h2 style={{ flex: 1 }}>Issue Id: {newIssue.id}</Text>
            <View style={{ flex: 2 }}>
                <Icon name='alarm-light-outline' type='material-community' size={ 200 }/>
                <Text h3>The issue has been registered</Text>
                <Text>Your contribution by reporting any issues you encounter is essential to us. Your report is invaluable and an agent will be in touch with you to follow up.</Text>
            </View>
        </View>
        <Button style={{ flex: 1 }}  size='lg' title='Done' onPress={ ()=> navigation.popToTop() }/>
    </View>
}

const style=StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        paddingBottom: 25,
        alignItems: 'center',
        gap: 30,
        justifyContent: 'space-evenly'
    },
})