import { useEffect, useState } from "react"

const useContactData =()=>{
    const [ contactData, setContactData ] = useState();
    const [ loading, setLoading ] = useState(true);
    
    
    useEffect(()=>{
        fetch(commandUri,)
    },[]);
    return [ contactData, loading ];
}

export default useContactData;