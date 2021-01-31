import React from 'react'
import { Redirect } from 'react-router-dom';
import ItemService from '../../../../services/ItemService';
import Spinner from '../../../Spinner'

function ItemUserPanel(props)
{
    const [redirect, setRedirect] = React.useState(false);;
    const [loading, setLoading] = React.useState(false);

    async function deleteItem()
    {
        setLoading(true);
        let response = await ItemService.deleteItem(props.item.id);
        console.log(response);
        setRedirect(true);
    }

    return(
        <div className="d-flex justify-content-end m-3">
            {redirect && <Redirect to="/userPage"/>}
            <ul class="nav">
                <li class="nav-item ml-4">
                    <a class="btn btn-secondary" href={`/updateItem/${props.item.id}`}>
                        <i class="fa fa-edit"></i>&nbsp;&nbsp;Edit
                    </a>
                </li>
                <li class="nav-item ml-4">
                    <button type="button" class="btn btn-danger" onClick={() => {if(window.confirm('Delete Item?')) {deleteItem()} }}>
                        <i class="fa fa-trash"></i>&nbsp;&nbsp;Delete
                        {loading && <Spinner />}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default ItemUserPanel;