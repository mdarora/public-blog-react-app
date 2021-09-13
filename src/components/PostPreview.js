import React from 'react';
import {Link} from 'react-router-dom';

const PostPreview = (props) => {
    const {title, subTitle, slug, createdAt} = props.post;
    const {name, username} = props.post.postedBy;
    const postLink = `/post/${slug}`;
    const userLink = `/profile/${username}`;

    const date = new Date(createdAt).toLocaleDateString();

    return (
    <>
    <div className="post-preview">
        <Link to={postLink}>
            <h2 className="post-title">
                {title}
            </h2>
            <h3 className="post-subtitle">
                {subTitle}
            </h3>
        </Link>
        <p className="post-meta">Posted by
            <Link to={userLink}> {name} </Link>
            on {date}
        </p>
    </div>
    <hr/>
    </>
    )
}

export default PostPreview
