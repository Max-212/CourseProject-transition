import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import Context from '../../../../context';
import CollectionService from '../../../../services/CollectionService';
import ItemService from '../../../../services/ItemService';
import Spinner from '../../../Spinner';
import ItemForm from './ItemForm';

function UpdateItem(props)
{
    const {user} = React.useContext(Context);
    const [title, setTitle] = React.useState('');
    const [fields, setFields] = React.useState([])
    const [loading, setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    async function submit(item)
    {
        setLoading(true);
        let response = await ItemService.updateItem(props.match.params.id, item.Title, item.Fields, 0)
        setRedirect(true);
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
                if(user && response.data.collection.user.userName === user.username)
                {
                    setTitle(response.data.title);
                    let itemFields = response.data.collection.fields.map(field =>
                        {
                            let itemField = response.data.fields.filter(f => f.title === field.title && f.type === field.type)[0];
                            if(itemField)
                                field.value = itemField.value;
                            return field;
                        })
                    console.log(itemFields);
                    setFields(itemFields);
                }
                else
                {
                    setFailed(true);
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
    }, [props]);

    return(
        <>
        {loading && <Spinner />}
        {failed && <Redirect to='/home' />}
        {redirect && <Redirect to={`/item/${props.match.params.id}`} />}
        {fields && <ItemForm title = {title} fields = {fields} submitHandler = {submit} />}
        </>
    )
}

export default UpdateItem;