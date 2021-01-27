import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import Context from '../../../../context';
import CollectionService from '../../../../services/CollectionService';
import ItemService from '../../../../services/ItemService';
import Spinner from '../../../Spinner';
import ItemForm from './ItemForm';

function CreateItem(props)
{
    const {user} = React.useContext(Context);
    const [collection, setCollection] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    async function fecthCollection()
    {
        setLoading(true);
        let response = await CollectionService.getCollection(props.match.params.id);
        if(response.status === 200)
        {
            if(user && user.username === response.data.user.userName)
            {
                console.log(response.data);
                setCollection(response.data);
                setLoading(false);    
            }
            else setFailed(true);
        }
        else
        {
            setFailed(true);
        }
    }

    async function submit(item)
    {
        setLoading(true);
        console.log(item);
        let response = await ItemService.createItem(item.Title,item.Fields, collection.id)
        if(response.status === 200)
        {
            setLoading(false);
            setRedirect(true);
        }
        else
        {
            console.log(response);
            setFailed(true);
        }
    }

    useEffect(() =>
    {
        fecthCollection();
    }, [props])

    return(
        <>
        {loading && <Spinner />}
        {failed && <Redirect to='/home' />}
        {redirect && <Redirect to={`/collection/${collection.id}/items`} />}
        {collection && <ItemForm fields = {collection.fields} submitHandler = {submit} />}
        </>
    )
}

export default CreateItem;