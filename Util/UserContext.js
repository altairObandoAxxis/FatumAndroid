import { createContext, useContext, useState} from "react";

const UserContext = createContext({});
const useUserData =()=>{
    const context = useContext(UserContext);
    if (!context )
        throw 'useUserData must be used within an UserProvider'
    return context;
}
const UserProvider =( props )=>{
    const [ userData, setUserData ] = useState();
    return <UserContext.Provider {...props} value={{ userData, setUserData }}/>
}

export { useUserData, UserProvider }