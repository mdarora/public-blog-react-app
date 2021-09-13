import React, {useContext, useRef, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoginContext from '../context/LoginContext';

const Register = () => {

    const history = useHistory();

    const login = useContext(LoginContext);

    if (login.isloggedin) {
        history.push("/");
    }

    const [registerValues, setRegisterValues] = useState({
        name: "",
        username: "",
        password: "",
        cpassword: ""
    });
    const [regResText, setRegResText] = useState("");

    const registerResponse = useRef();

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, username, password, cpassword} = registerValues;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, username, password, cpassword})
            });
            const result = await res.json();

            if(result.error){
                registerResponse.current.classList.remove("text-success");
                registerResponse.current.classList.add("text-danger");
                setRegResText(result.error);
            } else if (result.message) {
                registerResponse.current.classList.remove("text-danger");
                registerResponse.current.classList.add("text-success");
                setRegResText(result.message);

                setTimeout(() => {
                    history.push("/login");
                }, 1000)
            }
            
        } catch (error) {
            registerResponse.current.classList.remove("text-success");
            registerResponse.current.classList.add("text-danger");
            console.log("Catched at register: ", error);
            setRegResText("Something went wrong!");
        }
    }

    const handleInput = e => {
        setRegisterValues((registerValues) => ({...registerValues,[e.target.name]: e.target.value }));
    }

    return (
    <>
        <Header heading="Register Here" subheading="Register to the Public Blog" pageClass="login-header page-heading"/>
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form name="sentMessage" id="contactForm" method="post" onSubmit={registerUser}>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" value={registerValues.name} onChange={handleInput} className="form-control" placeholder="Name"  name="name" autoComplete="off" />
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" value={registerValues.username} onChange={handleInput} className="form-control" placeholder="Username" id="username" name="username" autoComplete="off" />
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" value={registerValues.password} onChange={handleInput} className="form-control" placeholder="Password" id="password" name="password" autoComplete="off" />
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="Cpassword">Confirm Password</label>
                                    <input type="password" value={registerValues.cpassword} onChange={handleInput} className="form-control" placeholder="Confirm Password" id="cpassword" name="cpassword" autoComplete="off" />
                                </div>
                            </div>

                            <p className="text-danger text-center" ref={registerResponse}>{regResText}</p>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <hr/>
                <div className="reg text-center my-50">
                    <h4 className="mb-4">Already have an account?</h4>
                    <Link to="/login" className="btn btn-primary">Login Here</Link>
                </div>
            </div>

            <hr className="my-50" />
        </main>
        <Footer />
    </>
    )
}

export default Register
