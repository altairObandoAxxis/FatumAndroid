import { useState } from 'react'
import { Login } from './Login';
import { Home } from './Home';

export const Main=()=>{
    const [ isLogged, setLogged ] = useState(false);
    if( isLogged )
        return <Home onUserLogOut={ ()=> setLogged(false) }/>
    return <Login onUserLoginSuccess={ () => setLogged(true) }/>
}