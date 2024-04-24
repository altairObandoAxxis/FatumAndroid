import { Icon, ListItem, useTheme } from '@rneui/themed';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const ChangeListItem=({ change, onItemPress })=>{
    const { theme } = useTheme();
    return <TouchableOpacity style={ Styles.itemContainer } onPress={ onItemPress }>
        <ListItem bottomDivider>
            <Icon size={27} type={ change.iconType} name={ change.icon } color={ theme.colors.primary }/>
            <ListItem.Content>
                <ListItem.Title>{ change.name }</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    </TouchableOpacity>
}

const Styles = StyleSheet.create({
    itemContainer: {
        flex: 1
    }
})