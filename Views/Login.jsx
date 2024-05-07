import React, { useState, useEffect,useCallback, createRef } from 'react';
import { Button, Input } from '@rneui/themed'
import { ImageBackground, Image, View, Dimensions, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { DoLogin } from '../Api/login';
import { useUserData } from '../Util/UserContext';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();
export const Login =()=>{
    const screenWidth = Dimensions.get('screen').width;
    const emailRef = createRef();
    const passwordRef = createRef();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ email, setEmail ] = useState()
    const [ passw, setPassw ] = useState()
    const [ errorEmail, setErrorEmail ] = useState();
    const [ errorPass, setErrorPass ] = useState();
    const [appIsReady, setAppIsReady] = useState(false);
    const userData = useUserData();
    const ValidateLogin =()=>{
        if( !email || email.trim() == ''){
            setErrorEmail('Please input your username');
            emailRef.current.focus()
            emailRef.current.shake()
            return;
        }
        if( !passw || passw.trim() == ''){
            setErrorPass('Please input your username');
            passwordRef.current.focus()
            passwordRef.current.shake()
            return;
        }
        setIsLoading(true);
        DoLogin({ email: email, clave: passw })
        .then( response =>{
            if(!response.ok){
                Alert.alert('Login Error', response.msg);
                return;
            }
            userData.setUserData(response.outData);
        }).finally(() => setIsLoading(false))
    }
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
        });    
        return () => {
        showSubscription.remove();
        hideSubscription.remove();
        };
    }, []);
    useEffect(() => {
        async function prepare() {
          try {
            // Show splash screen for welcome to the app
            await new Promise(resolve => setTimeout(resolve, 1500));
          } catch (e) {
            console.warn(e);
          } finally {
            // Tell the application to render
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);
      const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
          // This tells the splash screen to hide immediately! If we call this after
          // `setAppIsReady`, then we may see a blank screen while the app is
          // loading its initial state and rendering its first pixels. So instead,
          // we hide the splash screen once we know the root view has already
          // performed layout.
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }

    return <View style={{ flex: 1, width: screenWidth, justifyContent: 'center' }} onLayout={ onLayoutRootView }>
        <ImageBackground 
            source={require('../assets/landing.png')} 
            resizeMode='cover' 
            style={{ 
                flex: 1, 
                justifyContent:'center',
                padding: 10
                }}>
            <KeyboardAvoidingView
                behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
                style={{ flex: 1 }}>
                <Image
                    source={require('../assets/fatum.png')} 
                    style={{ 
                        resizeMode:'contain', 
                        alignSelf:'center', 
                        width: 200, 
                        height: 200,
                        marginBottom: Platform.OS == 'ios' && keyboardStatus ? 75: 200,
                        }} />
                <Input 
                    name='email' 
                    ref={ emailRef } 
                    keyboardType='email-address' 
                    placeholder='User'
                    errorMessage={ errorEmail }
                    value={ email }
                    leftIcon={{ type: 'font-awesome', name: 'user', color:'gray' }}
                    onChangeText={ value => setEmail(value )}/>
                <Input 
                    name='password'
                    secureTextEntry={true}
                    ref={ passwordRef }
                    placeholder='Password'
                    errorMessage={ errorPass }
                    leftIcon={{ type: 'font-awesome', name: 'lock', color:'gray' }}
                    value={ passw }
                    onChangeText={ value => setPassw( value )}/>
                <Button 
                    title="Sign In" onPress={ ValidateLogin }
                    style={{ width: '90%', alignSelf:'center', borderRadius: 10, overflow: 'hidden'}}
                    loading={ isLoading }
                    disabled={ isLoading }
                    />
            </KeyboardAvoidingView>
            
        </ImageBackground>
    </View>
}