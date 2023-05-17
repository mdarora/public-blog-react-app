import {createContext, useState, useEffect} from 'react';
import cookie from "js-cookie";

const LoginContext = createContext();

export const LoginState = (props) => {

    const [isloggedin, setIsloggedin] = useState(true);
    const [loggedUser, setLoggedUser] = useState({
        id: "", name: "", username: ""
    });

    const loginGet = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/login`);
            const result = await res.json();

            if(result.id){
                setLoggedUser(result);
            } else if (result.error) {
                setIsloggedin(false);
            }

        } catch (error) {
            console.log("Catched at login context: ", error);
        }
    }

    useEffect(()=>{
        if (cookie.get("token")){
            setIsloggedin(true);
            loginGet();
        } else {
            setIsloggedin(false);
        }
    }, []);
    

    return (
        <LoginContext.Provider value={{isloggedin, setIsloggedin, loggedUser, setLoggedUser}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContext;