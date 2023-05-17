import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHistory, useParams } from 'react-router';
import PostRow from '../components/PostRow';
import LoginContext from '../context/LoginContext';

const Profile = () => {

    const history = useHistory();

    const [posts, setPosts] = useState([]);

    const [noPost, setNoPost] = useState(true);
    const {username} = useParams();

    const {isloggedin, loggedUser} = useContext(LoginContext);

    if (isloggedin && loggedUser.username === username) {
        history.push("/myposts");
    }

    const getProfilePosts = async () =>{
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/profile/${username}`);
            const result = await res.json();

            if(result.posts){
                setNoPost(false);
                setPosts(result.posts);
            }
        } catch (error) {
            console.log("catched at profile/username: ", error);
        }
    }

    useEffect(()=>{
        getProfilePosts();
        // eslint-disable-next-line
    },[]);
    return (
    <>
          <Header heading={username} subheading={"All posts of " + username + " are here"}  pageClass="site-heading"/>
          <main>
            <div className="container my-50">

                {noPost ? <>
                    <section className='mb-5'>
                        <h1 className='text-center mb-4'>No post available</h1>
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
                                </tr>
                            </thead>
                            <tbody>

                            {posts.map((post, index) => <PostRow key={index} i={index} post={post} />)}


                            </tbody>
                        </table>

                    </div>
                </div>
                </>}
            </div>

            <hr className="my-50" />
          </main>
          <Footer />
    </>
    )
}

export default Profile
