import React, { useEffect } from 'react'
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';
import Tag from './Tag';

function TagListHome(props)
{
    const[loading,setLoading] = React.useState(false);
    const[tags, setTags] = React.useState([]);

    useEffect(() =>
    {
        async function fetchTags()
        {
            setLoading(true);
            let response = await ItemService.getTags();
            if(response.status === 200)
            {
                setTags(response.data);
            }
            setLoading(false);
        }

        fetchTags();
    }, [props])

    return(
        <>
        {loading && <Spinner />}
        {tags.length > 0 &&
            tags.map(tag =>
            {
                return <Tag key = {tag.id} tag = {tag} userPanel = {false} />
            })
        }
        </>
    )
}

export default TagListHome;