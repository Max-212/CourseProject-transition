import React, { useEffect } from 'react'
import Context from '../../context';
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';
import ItemUserPanel from '../UserPage/Collections/Items/ItemUserPanel';
import FieldsView from './FieldsView';
import Markdown from 'react-markdown'
import TagList from './TagList';
import Comments from './Comments';

const divStyle = 
{
    maxWidth : '1200px'
}

const tagsDiv =
{
    maxWidth : '400px'
}

function ItemView(props)
{
    const {user} = React.useContext(Context);
    const [item , setItem] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [userPanel, setUserPanel] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const [likeLoading, setLikeLoading] = React.useState(false);
    const [likeCount, setLikeCount] = React.useState(0);

    async function like()
    {
        if(user && !likeLoading)
        {
            setLikeLoading(true);
            let response = await ItemService.like(props.match.params.id);
            if(response.status === 200)
            {
                setLiked(!liked);
                setLikeCount(response.data.likesCount);
            }
            setLikeLoading(false);
        }
        
    }

    useEffect(() =>
    {
        async function fetchData()
        {  
            setLoading(true);
            let response = await ItemService.getItemById(props.match.params.id);
            if(response.status === 200)
            {
                console.log(response.data);
                setItem(response.data);
                setLikeCount(response.data.likesCount);
                if(user && response.data.collection.user.userName === user.username)
                {
                    setUserPanel(true);
                }
                if(user && response.data.likes.filter(l => l.username === user.username)[0])
                {
                    setLiked(true);
                }
            }
            else
            {
                console.log(response);
                setFailed(true);
            }
            setLoading(false);
        }

        fetchData();
    }, [props])

    return(
        <>
        {userPanel && <ItemUserPanel item = {item} />}
        {loading && <Spinner />}
        {item &&
        <div className = 'd-flex flex-column align-items-center w-100 p-3'>
            <div className = 'card shadow w-100 rounded p-2' style = {divStyle}>
                
                <div className = 'd-flex justify-content-around flex-wrap'>
                    <div className = 'd-flex flex-column mw-100 flex-fill align-items-center m-1 border-right'>
                        <h3 className = 'w-100 text-center'>{item.title}</h3>
                        <div className="w-100 text-center">
                            <a className="nav-link text-dark" href={`/collection/${item.collection.id}`}>
                                <h5>Collection: &nbsp;{item.collection.title}</h5>
                            </a>
                            <FieldsView item = {item} />
                        </div>
                    </div>
                
                    <div className = 'mw-100 d-flex flex-column align-items-center p-3' style = {tagsDiv}>
                          <h3>Tags</h3>
                          <TagList item = {item} userPanel = {userPanel} />
                    </div>
                </div>

                <div className = 'd-flex justify-content-end align-items-center w-100 border-top p-4' 
                onClick = {like}>
                    {liked
                    ?<i className = 'fa fa-heart like-active'  aria-hidden="true"> &nbsp;&nbsp;{likeCount}</i>
                    :<i className = 'fa fa-heart like' aria-hidden="true"> &nbsp;&nbsp;{likeCount}</i>
                    }
                      
                </div>
            </div>
            <div className = 'shadow w-100 mt-4 rounded p-2' style = {divStyle}>
                <Comments item = {item} user = {user} />
            </div>
        </div>
        }   
        </>
    )
}

export default ItemView;