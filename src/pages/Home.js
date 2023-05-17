import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostPreview from '../components/PostPreview';
import LoginContext from '../context/LoginContext';

const postsPerPage = 5;

const Home = () => {

    const {isloggedin, loggedUser} = useContext(LoginContext);

    const [allPosts, setAllPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [errorMSg, setErrorMSg] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();


    const getPosts = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);
            const result = await res.json();

            if (result.error) {
                setErrorMSg(result.error);
            } else if (result.posts) {
                setTotalPages(Math.ceil(result.posts.length / postsPerPage));
                setAllPosts(result.posts);
                setErrorMSg(null);
            }

        } catch (error) {
            setErrorMSg("Something went wrong!");
            console.log("Catched at Home: ", error);
        }
    }

    const jumpPage = (e) => {
        e.preventDefault();

        const jumpNumber = e.target[0].value;

        if (jumpNumber > totalPages || jumpNumber < 1) {
            return alert("Page not found!");
        } else {
            setCurrentPage(parseInt(jumpNumber));
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(()=>{
        setPosts(allPosts.slice((currentPage - 1) * postsPerPage, ((currentPage - 1) * postsPerPage) +  postsPerPage));
    },[currentPage, allPosts]);

    return (
    <>
        <Header heading="Public Blog" subheading="A Blog for all" pageClass="site-heading" />
        <main>
            <div className="container my-50">
                {errorMSg ? (
                <section className='mb-5 text-center'>
                    <h1 className='mb-4'>{errorMSg}</h1>
                    {isloggedin ? <>
                        <h6>Hi <span className='themeColor'>{loggedUser.name}</span> add your first post.</h6>
                        <Link to="/addpost" className="btn btn-primary">Add Post</Link>
                    </> : <>
                        <h6>Login now and start posting</h6>
                    </>}
                    
                </section>
                ) : (
                <div className="row">
                    <div className="col-md-10 mx-auto">

                        {posts.map((post, index) => {
                            return <PostPreview key={index} post={post} />
                        })}


                        <div className="clearfix">
                            {currentPage !== 1 ? <button className="btn btn-primary float-left" onClick={() => setCurrentPage(currentPage - 1)}>&larr; prev</button> : null }
                            
                            {currentPage !== totalPages ? <button className="btn btn-primary float-right" onClick={() => setCurrentPage(currentPage + 1)}>Next &rarr;</button> : null}
                        </div>
                        <div className="text-center">
                            <h6 className="mb-2">Page {currentPage} of {totalPages}</h6>
                            {totalPages > 1 ? <form onSubmit={jumpPage}> 
                                Go to <input type="number" min="1" max={totalPages} placeholder="page no." className="jump-input"/> <br/>
                                <button type="submit" className="btn btn-primary mt-2">Jump Page</button>
                            </form> : null}
                        </div>
                    </div>
                </div>
                )}

            </div>
            <hr />
        </main>
        <Footer />
    </>
    )
}

export default Home
