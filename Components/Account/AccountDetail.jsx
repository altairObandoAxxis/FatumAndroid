import { Linking, Platform, TouchableOpacity, View } from 'react-native'
import { ListItem, Switch, Text, useTheme } from '@rneui/themed';
import { useUserData } from '../../Util/UserContext'
import { useState } from 'react';
export const AccountDetail =()=>{
    const { userData } = useUserData();
    const [checked, setChecked] = useState(true)
    const Contact = userData.Contact || {};
    const { theme } = useTheme(); 
    const subTitleColor = Platform.OS == 'android' ? theme.colors.greyOutline : theme.colors.grey0;
    const openTermsOfService = async ()=>{
        const axxisURL = 'https://en.axxis-systems.com';
        const supported = await Linking.canOpenURL(axxisURL);
        if(! supported ){
            console.log('URL not supported');
            return;
        }            
        await Linking.openURL(axxisURL);
    }
    return <>
    <View style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        flexDirection: 'column',
        paddingLeft: 20, paddingEnd: 20,  }}>
        <Text h2>Account </Text>
        <Text style={{ fontWeight:'100', color: subTitleColor }}>PERSONAL INFO</Text>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Customer Id: </Text>
                <Text>{ Contact.id }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>First Name: </Text>
                <Text>{ Contact.name }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Middle Name: </Text>
                <Text>{ Contact.middleName }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Last Name: </Text>
                <Text>{ Contact.surname1 }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Second Surname: </Text>
                <Text>{ Contact.surname2 }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Birthdate: </Text>
                <Text>{ (Contact.birth || '').split('T',1).pop() }</Text>
            </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Contact Info: </Text>
                <Text>{ Contact.phone }</Text>
            </ListItem.Content>
        </ListItem>
        <TouchableOpacity>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.primary }}> Address </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>
        <ListItem bottomDivider>
            <ListItem.Content>
                <Text style={{ fontWeight:'100', color: subTitleColor }}>Actions: </Text>
                <Text> Send Emails</Text>
            </ListItem.Content>
            <Switch value={ checked } onValueChange={(value) => setChecked(value)}/>
        </ListItem>
        <TouchableOpacity onPress={ openTermsOfService }>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={{ color: theme.colors.primary }}> Terms of Service </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </TouchableOpacity>
    </View>
    </>
}