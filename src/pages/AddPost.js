import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHistory } from 'react-router';
import LoginContext from '../context/LoginContext';

const AddPost = () => {
    const history = useHistory();
    const {isloggedin} = useContext(LoginContext);

    if (!isloggedin) {
        history.push("/");
    };

    const [newPost, setNewPost] = useState({
        title: "", subTitle: "", slug: "", desc: ""
    });
    const [resText, setResText] = useState("");

    const handleInput = e => {
        setNewPost((newPost) => ({...newPost,[e.target.name]: e.target.value }));
    }

    const addThePost = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/add-post`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });
            const result = await res.json();

            if (result.error){
                setResText(result.error);
            } else if (result.message) {
                history.push("/");
            }
            
        } catch (error) {
            console.log("catched at addthepost: ", error);
            setResText("Something went wrong!");
        }
    }
    return (
    <>
        <Header heading="Add Post" subheading="Add a Public Post" pageClass="site-heading"/>
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <p>Add a public post to the public blog, Where any one can see and comment on it. <br/> <small>*mandatory</small></p>
                        
                        <form onSubmit={addThePost}>
                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="title">Post Title*</label>
                                    <input type="text" id="title" onChange={handleInput} value={newPost.title} className="form-control" placeholder="Post Title*" name="title"  autoComplete="off" />
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="subTitle">Sub-heading</label>
                                    <input type="text" id="subTitle" onChange={handleInput} value={newPost.subTitle} className="form-control" placeholder="Sub-heading" name="subTitle"  autoComplete="off" />
                                </div>
                            </div>


                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="slug">Slug*</label>
                                    <input type="text" id="slug" onChange={handleInput} value={newPost.slug} className="form-control" placeholder="Slug*" name="slug"  autoComplete="off" />
                                </div>
                            </div>

                            <div className="control-group">
                                <div className="form-group col-xs-12 floating-label-form-group controls">
                                    <label htmlFor="desc">Description*</label>
                                    <textarea id="desc" name="desc" onChange={handleInput} value={newPost.desc} className="form-control" placeholder="Description*" autoComplete="off" ></textarea>
                                </div>
                            </div>

                            <br/>

                            <p className="text-danger text-center">{resText}</p>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
        </main>
        <Footer/>
    </>
    )
}

export default AddPost;
