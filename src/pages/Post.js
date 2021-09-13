import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import { useParams } from 'react-router';

const Post = () => {

    const [postInfo, setPostInfo] = useState({});
    const [newResText, setNewResText] = useState("");
    const [commentAdded, setCommentAdded] = useState("");
    const [comments, setComments] = useState([]);


    const {slug} = useParams();

    const getPost = async () => {
        try {
            const res = await fetch("/api/post/" + slug);
            const result = await res.json();

            if(result.post){
                setPostInfo(result.post);
                getComments(result.post._id);
            }
            
        } catch (error) {
            console.log("catched on getPost: ", error);
        }
    }

    const getComments = async (postId) => {
        try {
            const commentsRes = await fetch("/api/comments/" + postId);
                const commentsResult = await commentsRes.json();
                if(commentsResult.comments){
                    setComments(commentsResult.comments);
                }
            
        } catch (error) {
            console.log("catched on getComments: ", error);
        }
    }

    const addComment = async (e) => {
        e.preventDefault();
        const comment = e.target[0].value;
        if (!comment) {
            setNewResText("Empty request not allowed");
        }

        try {
            const res = await fetch("/api/add-comment", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({postId: postInfo._id, comment})
            });
            const result = await res.json();

            if(result.error){
                setNewResText(result.error);
            } else if (result.message) {
                e.target.reset();
                getComments(postInfo._id);
                setCommentAdded(result.message);
                setTimeout(()=> {
                    setCommentAdded("");
                }, 1000);
            }
        } catch (error) {
            console.log("catched on add comment: ", error);
            setNewResText("Something went wrong!");
        }
    }

    useEffect(()=>{
        getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <>
        {postInfo.postedBy ? <Header post={postInfo} /> : <Header heading="Post fetching error!" subheading="Can't find the post it may be a server error." pageClass="login-header page-heading"/>}
        
        <main>
            <article>
                <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-10 mx-auto">
                        {postInfo.desc}
                    </div>
                </div>
                </div>
            </article>

            <hr className="my-50"/>

            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-10 mx-auto">
                        
                        {comments.length !== 0 ? <> 
                            <h5><u>{comments.length} Comments</u></h5>
                            <ul className="comment-list">
                                {comments.map((c,i) => (
                                    <Comment key={i} id={c._id} userId={c.commentedBy.id} comment={c.comment} name={c.commentedBy.name} username={c.commentedBy.username} timestamp={c.createdAt} />
                                ))}
                            </ul>
                        </> : <h5>No Comments found.</h5> }

                    </div>
                </div>
            </div>

            <hr className="my-50"/>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <h4 className="text-center">Add a public comment for this post.</h4>
                        <form onSubmit={addComment} >
                            <div className="control-group">
                                <div className="form-group floating-label-form-group controls">
                                    <label htmlFor="comment">Write a comment</label>
                                    <textarea className="form-control" placeholder="Write a comment" id="comment" name="comment"></textarea>
                                    <p id="commentBlock" className="help-block text-danger">{newResText}</p>
                                </div>
                            </div>
                            
                            <div className="text-success text-center">{commentAdded}</div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" id="sendMessageButton">Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <hr className="my-50"/>
        </main>
        <Footer />
    </>
    )
}

export default Post
