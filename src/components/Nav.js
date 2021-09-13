import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import LoginContext from '../context/LoginContext';

const Nav = () => {

    const {isloggedin} = useContext(LoginContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Public Blog</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <i className="fas fa-bars"> </i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {isloggedin ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addpost">Add Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/myposts">My Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-primary" to="/logout">Logout</Link>
                            </li>
                        </>
                        ): (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-primary nav-register-btn" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn btn-primary" to="/login">Login</Link>
                            </li>
                        </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
