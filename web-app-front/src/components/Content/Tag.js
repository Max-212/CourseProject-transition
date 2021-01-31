import React from 'react'
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';

function Tag(props)
{

    async function deleteTag()
    {
        let response = await ItemService.deleteTag(props.itemId, props.tag.id)
        if(response.status === 200)
        {
            props.setTags(response.data.tags);
        }
    }

    return(
        <>
        <div className = 'w-100 d-flex justify-content-between border rounded px-2 mb-4 align-items-center'>
            <div className = 'mw-100 mr-2'>
                <a className="nav-link text-primary" href={`/items?tagname=${props.tag.title}`}>{props.tag.title}</a>
            </div>
            {props.userPanel &&
                <i class="fa fa-times deleteTag" aria-hidden="true"
                onClick = {deleteTag}></i>
            }
        </div>
        </>
    )
}

export default Tag;