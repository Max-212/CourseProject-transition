import React, { useEffect, useContext } from 'react'
import { Redirect} from "react-router-dom";
import CollectionService from '../../services/CollectionService';
import Spinner from '../Spinner';
import CollectionUserPanel from '../UserPage/Collections/CollectionUserPanel'
import Context from '../../context'
import Markdown from 'react-markdown'
const imageStyle =
{
    maxWidth : '500px'
}

const divStyle =
{
    maxWidth : '800px'
}

function CollectionView(props)
{
    
    const {user} = useContext(Context);

    const[loading,setLoading] = React.useState(false);
    const[collection, setCollection] = React.useState(null);
    const[userPanel, setUserPanel] = React.useState(false);
    const[error, setError] = React.useState(false);
    const[image, setImage] = React.useState('https://cdn.mouzenidis-travel.ru/userfiles/images/adaptive/no-photo-available.png');

    useEffect(() =>
    {
        async function fetchData()
        {
            setLoading(true);
            let response = await CollectionService.getCollection(props.match.params.id);
            if(response.status === 200)
            {
                setCollection(response.data);
                if(user && response.data.user.userName === user.username) setUserPanel(true); 
                if(response.data.image) setImage(response.data.image);
            }
            else
            {
                setError(true);
            }
            setLoading(false);
        }
        if(!collection && !error) fetchData();
    }, [user])
    

    return(
        <>
        {error && <Redirect to="/home" />}
        {userPanel && <CollectionUserPanel collection = {collection}/>}
        {loading && <Spinner/>}
        {collection &&
        <div className="shadow card flex-row flex-wrap m-3">
            <div className="border">
                <img className='w-100' src={image} style={imageStyle}/>
            </div>
            <div className="card-block px-5 py-2 w-100" style={divStyle}>
                <h4 className="card-title">{collection.title}</h4>
                <h5>Theme:&nbsp;{collection.theme}</h5>
                <p className="card-text p-2"><Markdown source={ collection.description} /></p>
            </div>
            <div className="w-100 text-center border-top">
                <a className="nav-link text-primary" href={`/collection/${collection.id}/items`}>Items</a>
            </div>
        </div>
        }
        </>
    )
}

export default CollectionView