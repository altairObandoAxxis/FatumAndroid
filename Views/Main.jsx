import { Login } from './Login';
import { Home } from './Home';
import { useUserData } from '../Util/UserContext';

export const Main=()=>{
    const { userData } = useUserData();
    if( userData && userData.token )
        return <Home />
    return <Login />
}