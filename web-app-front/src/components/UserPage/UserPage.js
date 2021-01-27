import React, {useContext } from 'react'
import Context from '../../context'
import { Redirect } from 'react-router'
import CollectionList from './Collections/CollectionList'

function UserPage(props)
{
    const {user} = useContext(Context);
    const [notAuth, setNotAuth] = React.useState(false)

    if(!user && !notAuth) setNotAuth(true);

    return(
        <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between m-3'>
                {notAuth && (<Redirect to='/login'/>)}
                <a className="btn btn-success btn-lg" href="/createCollection">Create</a>
                <h2>Collections</h2>
            </div>
            {user &&(<CollectionList user = {user}/>)}
        </div>
    );
}

export default UserPage;