import { Card, Input, ListItem, Text, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
export const InsuredSumChange =({ Policy })=>{
    const { theme } = useTheme();
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const [ newSA, setNewSA ] = useState();

    return <View style={ style.container }>
        <View>
            <Text style={{ fontWeight:'100', color: subTitleColor }}>CHANGE OPTIONS</Text>
            <Card>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <Text style={{ fontWeight:'100', color: subTitleColor }}>Current Sum Insured</Text>
                        <Input disabled value={ Number(Policy.insuredSum || 0).toLocaleString() } />
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <Text style={{ fontWeight:'100', color: subTitleColor }}>New Sum Insured</Text>
                        <Input value={ newSA } onChangeText={ newValue => setNewSA(newValue)} keyboardType='numeric' />
                    </ListItem.Content>
                </ListItem>
            </Card>
        </View>
    </View>
}

const style= StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        columnGap: 25
    }
})