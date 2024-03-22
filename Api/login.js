import { useEffect, useState } from "react";
import { useUserData } from "../Util/UserContext";

export const DoLogin = async ({ email, clave })=>{
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({ email, clave }),
    };
    try {
        const endPoint = process.env.EXPO_PUBLIC_API_LOGIN;
        const request = await fetch(endPoint, requestOptions);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const DoCmd = async ({ cmd, data, token = '' })=>{
    const { userData } = useUserData()
    const commandUri = process.env.EXPO_PUBLIC_API_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (token + userData.token)
            },
        body: JSON.stringify({ cmd, data }),
    };
    try {
        const request = await fetch(commandUri, requestOptions);
        const response = await request.json();
        return response;
    } catch (error) {
        return { cmd, data:{ outData: null, msg: error.message, ok: false }}
    }
}

export const useDoCmd = ({ cmd, data })=>{
    const { userData } = useUserData()
    const [ response, setResponse ] = useState()
    const commandUri = process.env.EXPO_PUBLIC_API_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userData.token
            },
        body: JSON.stringify({ cmd, data }),
    };
    useEffect(()=>{
        fetch( commandUri, requestOptions)
        .then( resp => resp.json())
        .then( data => setResponse(data.outData))
        .catch( error => setResponse({ cmd, data:{ outData: null, msg: error.message, ok: false }}))
    },[cmd, data]);
    return [ response ]
}