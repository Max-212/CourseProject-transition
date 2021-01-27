import React from 'react'

function ItemsUserPanel(props)
{

    return(
        <div className='d-flex justify-content-start m-3'>
            <a className="btn btn-success btn-lg" href={`/createItem/${props.collectionId}`}>Create</a>
        </div>
    )
}

export default ItemsUserPanel;