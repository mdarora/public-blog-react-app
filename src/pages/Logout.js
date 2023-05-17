import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import LoginContext from '../context/LoginContext';

const Logout = () => {
    const history = useHistory();
    const {setIsloggedin, setLoggedUser} = useContext(LoginContext);
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/logout`).then(()=>{
            setIsloggedin(false);
            setLoggedUser({id: "", name: "", username: ""});
            history.push("/login");
        });
    });
    
    return (
        <>
            
        </>
    )
}

export default Logout
