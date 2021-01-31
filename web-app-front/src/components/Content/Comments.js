import React, { useEffect } from 'react'
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';

function Comments(props)
{   
    const [comments,setComments] = React.useState([]);
    const [comment, setComment] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function fetchComments()
    {
        let response = await ItemService.getComments(props.item.id)
        if(response && response.status === 200)
        {
            setComments(response.data);
        }
    }

    async function addComment()
    {
        setLoading(true);
        let response = await ItemService.addComment(props.item.id,comment);
        if(response && response.status === 200)
        {
            setComment('');
        }
        setLoading(false);
    }

    function validateForm()
    {
        return comment.length > 0;
    }

    function convertUTCDateToLocalDate(date) {
        let newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
        let offset = date.getTimezoneOffset() / 60;
        let hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate.toLocaleString();   
    }

    useEffect(() =>
    {
        setComments(props.item.comments);
        setInterval(fetchComments,1000)
    },[props])

    return(
        <>
        {comments.length>0 && 
        <div className = 'd-flex flex-column align-items-center p-3'>
            <h4>Comments</h4>
        {comments.map(comment =>
        {
            let date = convertUTCDateToLocalDate(new Date(comment.createdDate));
            return <div className = 'shadow-sm d-flex flex-column align-items-center w-100 mb-4 border rounded'>
                        <div className = 'd-flex flex-column align-items-center w-100 p-1 border-bottom text-secondary'>
                            <em>{comment.author}</em>
                            <em>Created:&nbsp;{date}</em>
                        </div>
                        <div className = 'mw-100 p-3'>
                            <em>{comment.text}</em>
                        </div>
                    </div>
        })
        }
        </div>
        }
        {props.user &&
        <div className = 'd-flex flex-column align-items-center m-3 p-2 shadow rounded'>
            <textarea type="input" className="form-control mb-4"
                value = {comment}
                placeholder = 'Write comment...'
                onChange = {e => setComment(e.target.value)}/>
            <button className="btn btn-success" onClick = {e => addComment(e)} disabled = {!validateForm()}>
                    Comment
            </button>
            {loading && <Spinner />}
        </div>
        
        }
        </>
    )
}

export default Comments;