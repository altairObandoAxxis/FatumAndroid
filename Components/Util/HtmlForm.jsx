import { Button } from '@rneui/themed';
import { createRef, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview';
import { useUserData } from '../../Util/UserContext';

export const HtmlForm=({ html, additionalContext, callBack, loading })=>{
    const { userData } = useUserData();
    const webRef = createRef();
    const onFormResponse =(message)=>{
        const formData = JSON.parse(message);
        if(!formData.valid){
            Alert.alert('Missing Fields', 'Please check form');
            return;
        }
        if ( typeof callBack === 'function')
            callBack(formData);
        else
            console.log(formData);
    }
    const executeLogicForm = `
        async function makeRequest( url, data ){
            const response = await fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ${userData.token}'
                },
                body: JSON.stringify(data)
            });
            const responseObject = await response.json();
            return responseObject;
        }
        async function exe( commandName, data ){
            const response = await makeRequest('${process.env.EXPO_PUBLIC_API_URL}', { cmd: commandName, data });
            return response;
        }
        ${additionalContext || '' }
        setTimeout(()=>{
            try{
                loadForm();
            }catch(error){
                window.alert(error)
            }
        }, 1500)        
        true
    `;
    setTimeout(()=>{
        if(!webRef.current)
            return;
        webRef.current.injectJavaScript(executeLogicForm);
    }, 500);
    const submitForm =()=>{
        const request = `window.ReactNativeWebView.postMessage(JSON.stringify(validateForm()))`;
        webRef.current.injectJavaScript(request);
    }
    return <View style={ style.container }>
        { loading && <ActivityIndicator />}
        <WebView 
        ref={ webRef }
        style={ style.webView }
        source={{ html: html }}
        javaScriptEnabled={ true }
        onMessage={ event => onFormResponse(event.nativeEvent.data)}/>
        <Button title={'Submit'} disabled={ loading } loading={ loading } onPress={submitForm}/>
    </View>
}

const style= StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 5,
        padding: 20,
        backgroundColor: 'white',
    },
    webView:{
        flex: 1,
        marginBottom: 15
    }
})