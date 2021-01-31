import React, { useEffect } from 'react'
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';
import ItemsList from './ItemsList';

function SearchItemsPage(props)
{
    const [items, setItems] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function FetchByTag(tag)
    {
        setLoading(true);
        let response = await ItemService.getItemsByTag(tag);
        if(response.status === 200)
        {
            setItems(response.data)
        }
        setLoading(false);
    }

    async function FetchByWord(value)
    {
        setLoading(true);
        let response = await ItemService.searchItems(value);
        if(response.status === 200)
        {
            setItems(response.data);
        }
        setLoading(false);
    }

    useEffect(()=>
    {
        let tag = new URLSearchParams(props.location.search).get("tagname")
        let searchWord = new URLSearchParams(props.location.search).get("searchWord") 
        
        if(searchWord)
        {
            FetchByWord(searchWord);
        }
        else if(tag)
        {
            FetchByTag(tag);
        }

    }, [props])

    return(
        <>
        {loading && <Spinner />}
        {items && <ItemsList items = {items} />}
        </>
    )
}

export default SearchItemsPage