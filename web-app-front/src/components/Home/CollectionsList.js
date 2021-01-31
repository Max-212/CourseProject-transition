import React, { useEffect } from 'react'
import CollectionService from '../../services/CollectionService';
import CollectionPreview from '../Content/CollectionPreview';
import Spinner from '../Spinner';
import CollectionList from '../UserPage/Collections/CollectionList'

function CollectionsList(props)
{
    const [loading, setLoading] = React.useState(false);
    const [collections, setCollections] = React.useState([]);

    useEffect(() =>
    {
        async function fetchCollections()
        {
            setLoading(true);
            let response = await CollectionService.getLargestCollections();
            console.log(response);
            if(response.status === 200)
            {
                let i = 0;
                let collecs = response.data.map(collection =>
                    {
                        collection.key = i++;
                        return collection;
                    })
                setCollections(collecs);
            }
            setLoading(false);
        }

        fetchCollections();
    }, [props])

    return(
        <>
        {loading && <Spinner/>}
        {
            collections.map(collection =>
            {
                return <CollectionPreview key = {collection.key} collection = {collection} />
            })
        }
        </>
    )
}

export default CollectionsList;