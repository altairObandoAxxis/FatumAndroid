import { Button, LinearProgress, Text, useTheme } from '@rneui/themed';
import { Alert, View } from 'react-native';
import { WebView } from 'react-native-webview'
import { useUserData } from '../../Util/UserContext';
import { createRef, useState } from 'react';
import { DoCmd } from '../../Api';

const GenerateRandomId =()=> (Math.random()*new Date().getTime()).toString().substring(0,5);
export const ProductForm =({ navigation, route })=>{
    const Product = route.params;
    if( !Product.config.SelfService){
        return <View>
            <Text h3> No Self Service configuration Found </Text>
        </View>
    }
    if( !Product.config.SelfService.Quote){
        return <View>
            <Text h3> No Quotation configuration Found </Text>
        </View>
    }
    const { config: { SelfService: { Quote: { mobileForm } }}} = Product;
    const { userData } = useUserData();
    const { theme } = useTheme();
    const [ loading, setLoading ] = useState(false);
    const webview = createRef();
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
        setTimeout(()=>{
            try{
                loadForm();
            }catch(error){
                window.alert(error)
            }
        }, 1000)        
        true
    `;
    const QuoteProduct = async ({ data })=>{
        try {
            setLoading(true);
            const QuotePortalProduct = await DoCmd({ cmd: 'QuotePortalProduct', data, token: userData.token });
            if(!QuotePortalProduct.ok)
                throw QuotePortalProduct.msg;
            navigation.navigate('productOptions', { Options: QuotePortalProduct.outData.map(item => ({...item, id: GenerateRandomId()  })) || [] });
        } catch (error) {
            Alert.alert('Quotation Error', error)
        }finally{
            setLoading(false);
        }
    }
    const validateForm =()=>{
        const request = `window.ReactNativeWebView.postMessage(JSON.stringify(validateForm()))`;
        webview.current.injectJavaScript(request);
    }
    const onWebViewMessage=(message)=>{
        const formData = JSON.parse(message);
        if(!formData.valid){
            Alert.alert('Product Configuration', 'Please check form')
            return;
        }
        // Call quote
        QuoteProduct({ data: { jFormValues: {...formData.data, holderId: userData.contactId }, productCode: Product.code } });
    }
    setTimeout(() => {
        if( webview.current )
            webview.current.injectJavaScript(executeLogicForm);
    }, 500);
    return <View style={{ 
        display: 'flex',
        flex: 1, 
        flexDirection: 'column', 
        gap: 5,
        paddingLeft:20,
        paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: 'white'}}>
        
        <Text h3>{ Product.name }</Text>
        { loading && <LinearProgress variant='indeterminate' color={ theme.colors.primary } /> }
        { mobileForm && <>
            <WebView 
                ref={ webview }
                style={{ flex: 1, marginBottom: 10 }}
                originWhitelist={['*']}
                source={{ html: mobileForm }}
                javaScriptEnabled={ true }
                onMessage={ event => onWebViewMessage(event.nativeEvent.data)} />
            <Button onPress={ validateForm } disabled={ loading } loading={ loading } title={'Submit'} />
            
            </>
        }
        { !mobileForm && <Text h3> No Quotation form configured </Text>}
    </View>
}