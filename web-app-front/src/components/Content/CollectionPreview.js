import React from 'react';
import { Redirect, useHistory } from "react-router-dom";

const divStyle = 
{
    width : '252px',
 
}

const imageStyle =
{
    width : '250px',
    height : '150px'
}

function CollectionPreview(props)
{
    const [redirect, setRedirect] = React.useState(false);
    //let history = useHistory();
    let image = props.collection.image;
    if(!image)
    {
        image = 'https://cdn.mouzenidis-travel.ru/userfiles/images/adaptive/no-photo-available.png'
    }


    return(
        <div className="card m-5 collection__preview" style={divStyle} onClick = {e => {setRedirect(true)}}>
            <img className="hvr-zoom card-img-top" src={image} alt="Card image cap" style = {imageStyle}></img>
            <h5 class="card-header bg-transparent text-center">{props.collection.title}</h5>
            <div class="card-body d-flex flex-column justify-content-between">
                <p class="card-text">Theme:&nbsp;{props.collection.theme}</p>
                <p class="card-text"><small class="text-muted">Author:&nbsp;{props.collection.user.userName}</small></p>
            </div>
            {redirect && <Redirect to={`/collection/${props.collection.id}`} />}
        </div>
    )
}

export default CollectionPreview;