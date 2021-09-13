import React, {useContext} from 'react';
import LoginContext from '../context/LoginContext';

const Comment = (props) => {
    const timestamp = new Date(props.timestamp).toLocaleString();

    const {loggedUser} = useContext(LoginContext);

    const deleteComment = async (id) => {
        if(window.confirm("Do you really want to delete this comment ?")){
            try {
                const res = await fetch("/api/comment/" + id, {
                    method: "DELETE",
                    credentials: "include"
                });
                const result = await res.json();

                if(result.message){
                    document.getElementById(id).remove();
                }
            } catch (error) {
                console.log("Catched at delete comment : ", error);
            }
        }
    }

    return (
    <>
        {loggedUser.id === props.userId ? <> 
            <li id={props.id} className="mb-2 comment">
                <h6><a href={"/profile/" + props.username}>{props.name}</a> : <span>{props.comment}</span></h6>
                <small className="comment-time">
                    <em>Commented on {timestamp}</em>
                    {loggedUser.id === props.userId ? <> 
                        <button onClick={()=> deleteComment(props.id)} className="del-comment-btn text-danger"><i className="fa fa-trash"></i></button>
                    </> : null}
                </small>
            </li>
        </> : <> 
            <li className="mb-2 comment"> 
                <h6><a href={"/profile/" + props.username}>{props.name}</a> : <span>{props.comment}</span></h6>
                <small className="comment-time">
                    <em>Commented on {timestamp}</em>
                    {loggedUser.id === props.userId ? <> 
                        <button onClick={()=> deleteComment(props.id)} className="del-comment-btn text-danger"><i className="fa fa-trash"></i></button>
                    </> : null}
                </small>
            </li>
        </>}
           
    </>
    )
}

export default Comment
