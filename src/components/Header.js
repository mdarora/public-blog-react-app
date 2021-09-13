import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Header = (props) => {
    return (
        <header className="masthead">
            <Nav/>
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        {props.post ? <>
                            <div className="post-heading">
                                <h1>{props.post.title}</h1>
                                <h2 className="subheading">{props.post.subTitle}</h2>
                                <span className="meta">Posted by
                                    <Link to={"/profile/" + props.post.postedBy.username}>
                                        <strong> {props.post.postedBy.name} </strong>
                                    </Link>
                                    on   {new Date(props.post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </> : <>
                            <div className={props.pageClass}>
                                <h1>{props.heading}</h1>
                                <span className="subheading">{props.subheading}</span>
                            </div>
                        </>}
                        {/* <h1>{props.heading}</h1>

                        {% if loggedIN %}
                            <span className="subheading">Welcome {{user}}</span>
                        {% else %}
                            <span className="subheading">{props.subheading}</span>
                        {% endif %} */}
                        
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
