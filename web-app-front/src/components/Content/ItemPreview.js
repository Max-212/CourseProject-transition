import React from 'react'
import { Redirect } from 'react-router-dom';

function ItemPreview(props)
{
    const [redirect, setRedirect] = React.useState(false);

    return(
        <>
        {redirect && <Redirect to={`/item/${props.item.id}`} />}
        <div className = 'p-2 d-flex justify-content-around mt-4 w-100 rounded bg-light item__preview'
        onClick = {e => setRedirect(true)}>
            <div>{props.item.title}</div>
            <div>Likes:&nbsp;{props.item.likesCount}</div>
        </div>
        </>
    )
}

export default ItemPreview;