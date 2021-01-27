import React from 'react'
import { Redirect } from 'react-router-dom';
import CollectionService from '../../../services/CollectionService';
import Spinner from '../../Spinner';

function CollectionUserPanel(props)
{
    const [redirect, setRedirect] = React.useState(false);;
    const [loading, setLoading] = React.useState(false);

    async function deleteCollection()
    {
        setLoading(true);
        let response = await CollectionService.deleteCollection(props.collection.id);
        if(response.status === 200)
        {
            setRedirect(true);
            setLoading(false);
        }
    }

    return(
        <div className="d-flex justify-content-end m-3">
            {redirect && <Redirect to="/userPage"/>}
            <ul class="nav">
                <li class="nav-item ml-4">
                    <a class="btn btn-secondary" href={`/updateCollection/${props.collection.id}`}>
                        <i class="fa fa-edit"></i>&nbsp;&nbsp;Edit
                    </a>
                </li>
                <li class="nav-item ml-4">
                    <button type="button" class="btn btn-danger" onClick={() => {if(window.confirm('Delete Collection?')) {deleteCollection()} }}>
                        <i class="fa fa-trash"></i>&nbsp;&nbsp;Delete
                        {loading && <Spinner />}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default CollectionUserPanel;