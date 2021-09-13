import React, { useContext, useRef, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginContext from '../context/LoginContext';


const Login = () => {

    const history = useHistory();

    const loginResponse = useRef();
    const login = useContext(LoginContext);

    if (login.isloggedin) {
        history.push("/");
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginResText, setLoginResText] = useState("");

    const loginUser = async (e) =>{
        e.preventDefault();

        try {
            const res = await fetch("/api/login", {
                method: "POST", 
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
            const result = await res.json();

            if (result.error) {
                loginResponse.current.classList.remove("text-success");
                loginResponse.current.classList.add("text-danger");
                setLoginResText(result.error);
                if (result.error === "Already loggedin.") {
                    login.setIsloggedin(true);
                    history.push('/');
                }
            } else if (result.message){
                login.setIsloggedin(true);
                login.setLoggedUser(result.loggedUser);
                history.push('/');
            }
            
        } catch (error) {
            console.log("Catched at register: ", error);

            loginResponse.current.classList.remove("text-success");
            loginResponse.current.classList.add("text-danger");
            setLoginResText("Something went wrong!");
        }
    }

    return (
    <>
        <Header heading="Login Here" subheading="Login to the Public Blog" pageClass="login-header page-heading"/>
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form method="post" onSubmit={loginUser}>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" placeholder="Username" name="username" autoComplete="off" />
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" name="password" />
                                </div>
                            </div>

                            <p className="text-danger text-center" ref={loginResponse}>{loginResText}</p>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr/>
                <div className="reg text-center my-50">
                    <h4 className="mb-4">Don't have an account?</h4>
                    <Link to="/register" className="btn btn-primary">Register Here</Link>
                </div>
            </div>

            <hr className="my-50" />
        </main>
        <Footer />
    </>
    )
}

export default Login
