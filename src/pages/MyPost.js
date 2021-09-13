import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHistory } from 'react-router';
import LoginContext from '../context/LoginContext';
import PostRow from '../components/PostRow';

const MyPost = () => {
    const history = useHistory();
    const {isloggedin} = useContext(LoginContext);

    if (!isloggedin) {
        history.push("/");
    };

    const [noPost, setNoPost] = useState(true);
    const [resText, setResText] = useState("No post available");

    const [myPosts, setMyPosts] = useState([]);

    const getMyPosts = async () => {
        try {
            const res = await fetch("/api/my-posts");
            const result = await res.json();

            if(result.error){
                setResText(result.error);
                setNoPost(true);
            } else if (result.posts){
                setNoPost(false);
                setMyPosts(result.posts);
            }
            
        } catch (error) {
            console.log("catched at myposts: ", error);
            setResText("Something went wrong!");
        }
    }

    const handlePostDelete = async (id) => {
        if(window.confirm("Do you want to delete this post ?")){

            try {
                const res = await fetch("/api/delete/" + id, {
                    method: "DELETE",
                    credentials: "include",
                });
                const result = await res.json();

                console.log(result);
                if (result.message){
                    getMyPosts();
                } else if (result.error) {
                    alert(result.error);
                }
            } catch (error) {
                console.log("catched at myposts: ", error);
            }
        }
    }
 
    useEffect(()=>{
        getMyPosts();
    }, []);

    return (
    <>
        <Header heading="My Posts" subheading="All your posts are here" pageClass="site-heading"/>
        <main>
            <div className="container my-50">
                {noPost ? <>
                <section className='mb-5'>
                    <h1 className='text-center mb-4'>{resText}</h1>
                    <h6 className='text-center'>Go to Add Post and start posting</h6>
                </section>
                </> : <>
                <div className="row">
                    <div className="col-12 mx-auto">

                        <table className="table text-center table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Date</th>
                                    <th>View posts</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {myPosts.map((post, index) => <PostRow key={index} i={index} post={post} handlePostDelete={handlePostDelete} />)}


                            </tbody>
                        </table>
                    </div>
                </div>
                </> }
            </div>
            <hr />
        </main>
        <Footer/>
    </>
    )
}

export default MyPost
