import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Context from '../../context';
import CollectionService from '../../services/CollectionService';
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';
import ItemsUserPanel from '../UserPage/Collections/Items/ItemsUserPanel'
import ItemsList from './ItemsList';

function ItemsPage(props)
{
    const {user} = React.useContext(Context);
    const [loading,setLoading] = React.useState(false);
    const [redirect,setRedirect] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [userPanel, setUserPanel] = React.useState(false);
    const [collection, setCollection] = React.useState(null);
    const [items, setItems] = React.useState(null);

    async function fecthCollection()
    {
        setLoading(true);
        let response = await CollectionService.getCollection(props.match.params.id);
        if(response.status === 200)
        {
            setCollection(response.data);
            if(user && response.data.user.userName === user.username)
                setUserPanel(true);       
            setLoading(false);
        }
        else
        {
            setFailed(true);
        }
    }

    async function fetchItems()
    {
        setLoading(true)
        let response = await ItemService.getItems(props.match.params.id);
        if(response.status === 200)
        {
            console.log(response.data);
            setItems(response.data)
            setLoading(false);
        }
        else
        {
            setFailed(true);
        }
    }

    useEffect(() =>
    {
        fecthCollection();
        fetchItems();
    },[user])

    return(
        <>
        {failed && <Redirect to="/home" />}
        {userPanel && <ItemsUserPanel collectionId = {collection.id} />}
        {loading && <Spinner />}
        {items && <ItemsList items = {items} />}
        </>
    )
}

export default ItemsPage;