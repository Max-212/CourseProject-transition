import React , {useEffect} from 'react'
import CollectionService from '../../../services/CollectionService';
import Spinner from '../../Spinner';
import CollectionPreview from '../../Content/CollectionPreview';

function CollectionList(props)
{
    const [loading, setLoading] = React.useState(false);
    const [collections, setCollections] = React.useState([]);

    useEffect(() =>
    {
        async function fetchData()
        {   
            setLoading(true);
            let response = await CollectionService.getUserCollections(props.user.username);
            if(response.status === 200)
            {
                setCollections(response.data);
            }
            setLoading(false);
        }
        if(props.user) fetchData();
    }, [props.user])

    return (
        <>
        {loading && (<Spinner/>)}
        <div className = "d-flex flex-wrap">
            {collections.map(collection =>
                {
                    return <CollectionPreview key = {collection.id} userPanel = {true} collection = {collection}/>
                })
            }
        </div>
        </>
    )
}

export default CollectionList;