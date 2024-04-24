import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Section } from '../../Util/Section';
import { Button, Icon, Input, Text } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useUserData } from '../../../Util/UserContext';
import { DoCmd } from '../../../Api/doCmd';

export const NewIssue=({ navigation })=>{
    const { userData:{ contactId, token, Policy }, setUserData } = useUserData();
    const [ issues, setIssues ] = useState([]);
    const [ reasons, setReasons]= useState([])
    const [ priorities, setPriorities ]=useState([]);

    const [ title, setTitle ] = useState();
    const [ description, setDescription] = useState();
    const [ issueType, setIssueType ] = useState();
    const [ reason, setReason ] = useState();
    const [ priorityCode, setPriorityCode ] = useState();
    const [ policyId, setPolicyId ] = useState()
    const [ policyCode, setPolicyCode ] = useState();
    const [ loading, setLoading ] = useState();
    const [ externalId, setExternalId ]= useState()
    const GetCatalogs = async()=>{
        const RepoIssueTypeCatalog   = await DoCmd({cmd:'RepoIssueTypeCatalog',data:{ operation:'GET'}, token });
        const RepoIssueReasonCatalog = await DoCmd({cmd:'RepoIssueReasonCatalog',data:{ operation:'GET'}, token });
        const RepoPriorityCatalog    = await DoCmd({cmd:'RepoPriorityCatalog',data:{ operation:'GET'}, token });
        setIssues(RepoIssueTypeCatalog.outData || []);
        setReasons(RepoIssueReasonCatalog.outData || []);
        setPriorities(RepoPriorityCatalog.outData || [])
    }
    // Load Catalogs
    useEffect(()=>{
        GetCatalogs();
        setUserData( current => ({...current, Policy: null }))
    },[]);
    useEffect(()=>{
        if(typeof Policy == 'undefined' || Policy == null){
            setPolicyId(0);
            setPolicyCode('');
            return;
        }
        setPolicyId(Policy?.id??0);
        setPolicyCode(Policy?.code??'');
    },[Policy])
    const CreateNewIssue= async()=>{
        try {
            setLoading(true);
            let dto = {
                contactId: contactId,
                title: title,
                description: description,
                issueType: issueType,
                issueReason: reason,
                priorityCode: priorityCode,
                policyId: policyId,
                externalId: externalId
            };
            const RepoIssue = await DoCmd({cmd:'RepoIssue', data:{ operation: 'ADD', entity: dto }, token });
            if(!RepoIssue.ok){
                Alert.alert(RepoIssue.msg);
                return;
            }
            navigation.navigate('issueCreated', RepoIssue.outData[0]);
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    const SearchPolicy =()=> navigation.navigate('searchPolicy', { isSelectPolicy: true })
    return <ScrollView style={ style.container }>
        <Section title='Information'>
            <Input placeholder='Title' onChangeText={ newValue => setTitle(newValue)} value={title} />
            <Input placeholder='Description' onChangeText={ newValue => setDescription(newValue)} value={description}/>
        </Section>
        <Section title='Issue Details'>
            <View style={style.rowContainer}>
                <Text style={{ flex: 1 }}>Issue Type</Text>
                <Picker  style={{ flex: 2 }} selectedValue={issueType} onValueChange={(value, _)=> setIssueType(value)}>
                    {
                        issues.map(item => <Picker.Item key={item.code} value={item.code} label={item.name} />)
                    }
                </Picker>
            </View>
            <View style={style.rowContainer}>
                <Text style={{ flex: 1 }}>Issue Reason</Text>
                <Picker  style={{ flex: 2 }} selectedValue={reason} onValueChange={(value, _)=> setReason(value)}>
                    {
                        reasons.filter(item => item.issueType == issueType).map(item => <Picker.Item key={item.code} value={item.code} label={item.name} />)
                    }
                </Picker>
            </View>
            <View style={style.rowContainer}>
                <Text style={{ flex: 1 }}>Priority</Text>
                <Picker  style={{ flex: 2 }} selectedValue={priorityCode} onValueChange={(value, _)=> setPriorityCode(value)}>
                    {
                        priorities.map(item => <Picker.Item key={item.code} value={item.code} label={item.name} />)
                    }
                </Picker>
            </View>
        </Section>
        <Section title='Policy Affected'>
            <TouchableOpacity style={{...style.rowContainer, borderBottomWidth: 1, borderBottomColor: 'black'}} onPress={SearchPolicy} >
                <Text style={{ flex: 2, paddingLeft: 5 }}>{ policyCode }</Text>
                <Button icon={ <Icon name='magnifying-glass' type='entypo' />} type='clear' onPress={SearchPolicy}/>
            </TouchableOpacity>
            <Input placeholder='External Id' value={externalId} onChangeText={newValue => setExternalId(newValue)}/>
        </Section>
        <Button title='Done' style={{marginBottom: 25 }} loading={loading} onPress={()=> CreateNewIssue() }/>
    </ScrollView>    
}

const style=StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        paddingBottom: 25,
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})