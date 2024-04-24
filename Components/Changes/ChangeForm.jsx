import React from 'react';
import { StyleSheet, View } from 'react-native';
import { InsuredSumChange } from './Forms/InsuredSumChange';
import { MaturityChange } from './Forms/MaturityChange';
import { NotTakenUpChange } from './Forms/NotTakenUpChange';
export const ChangeForm =({ route, navigation })=>{
    const { change, Policy } = route.params;
    return <View style={ styles.container }>
            { change.code == 'ChangePolicyCapital' && <InsuredSumChange Policy={ Policy } Change={ change } navigation={navigation} />}
            { change.code == 'ChangeTotalRescue' && <NotTakenUpChange Policy={ Policy } Change={ change } navigation={navigation}/>}
            { change.code == 'ChangeMaturity' && <MaturityChange Policy={ Policy } Change={ change } navigation={navigation}/>}
        </View>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        columnGap: 30,
    },
    buttonContainer:{ 
        flex: 1,
        padding: 20,
        marginTop: 30,
        marginBottom: 30,
    }
})