import { Linking, Platform, TouchableOpacity, View } from 'react-native'
import { Button, Input, ListItem, Switch, Text, useTheme } from '@rneui/themed';
import { useUserData } from '../../Util/UserContext'
import { useState } from 'react';
import { DoCmd } from '../../Api/doCmd';
import { Alert } from 'react-native';
export const AccountDetail =({ navigation })=>{
    const { userData, setUserData } = useUserData();
    const Contact = userData.Contact || {};
    const [ checked, setChecked ] = useState(true);
    const [ email, setEmail ] = useState(Contact.email);
    const [ phone, setPhone ] = useState(Contact.phone);
    const [ updating, setUpdating ] = useState(false)
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
    const SaveContactChange = async ()=>{
        setUpdating(true);
        const updateQuery = `phone='${phone}', email='${ email }'`;
        const SetField = await DoCmd({cmd:'SetField',data:{ entity:'Contact', entityId: Contact.id, fieldValue: updateQuery  }, token: userData.token });
        if(!SetField.ok){
            Alert.alert('Update Action', 'An error has occurred while updating');
            return;
        }
        // Update cache data.
        setUserData({...userData, Contact: { ...userData.Contact, email: email, phone: phone }});
        console.log('Updated');
    }
    return <>
    <View style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        flexDirection: 'column',
        paddingLeft: 20, paddingEnd: 20,  }}>
        <View style={{ display:'flex', flex: 1, flexDirection:'row', justifyContent:'space-between'}}>
            <Text h2>Account </Text>
            <Button radius={ 5 } disabled={ updating } loading={ updating } onPress={ SaveContactChange }>Save</Button>
        </View>
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
                <Input disabled={ updating } selectionColor={theme.colors.primary} keyboardType='phone-pad' value={ phone } onChangeText={ newPhone => setPhone(newPhone)} placeholder='Phone'/>
                <Input disabled={ updating } selectionColor={theme.colors.primary} keyboardType='email-address' value={ email } onChangeText={newEmail => setEmail(newEmail)} placeholder='Email'/>
            </ListItem.Content>
        </ListItem>
        <TouchableOpacity onPress={ ()=> navigation.navigate('addressList', { contactId: Contact.id })}>
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