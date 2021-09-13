import React from 'react';
import { Link } from 'react-router-dom';

const PostRow = (props) => {

    
    return (
    <>
    <tr>
        <td>{props.i + 1}</td>
        <td>{props.post.title}</td>
        <td>{props.post.slug}</td>
        <td>{new Date(props.post.createdAt).toLocaleDateString()}</td>
        <td>
            <Link title="View post" className="btn btn-outline-primary" to={"/post/" + props.post.slug}>
                <i className="fa fa-eye"></i>
            </Link>
        </td>
        {props.handlePostDelete ? 
        <>
            <td>
                <button onClick={()=> props.handlePostDelete(props.post._id)} title="Delete post" className="btn btn-outline-danger">
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </>: null}
    </tr> 
    </>
    )
}

export default PostRow
