import React, {useEffect} from 'react'
import ItemService from '../../services/ItemService'
import ItemPreview from '../Content/ItemPreview'

function ItemsList(props)
{
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([]);

    useEffect(() =>
    {
        async function fetchItems()
        {
            setLoading(true);
            let response = await ItemService.getLastItems();
            if(response.status === 200)
            {
                console.log(response);
                let i = 0;
                let itms = response.data.map(item =>
                    {
                        item.key = i++;
                        return item;
                    }) 
                setItems(itms);
            }
            setLoading(false);
        }
        fetchItems();
    }, [props]);

    return(
        <>

         {items.map(item =>
            {
                return <ItemPreview key = {item.key} item = {item} />
            })
        }
        </>
    )
}

export default ItemsList;