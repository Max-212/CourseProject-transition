import React, {useContext} from 'react'
import NotAuthorizedMenu from './NotAuthorizedMenu'
import AuthorizedMenu from './AuthorizedMenu';
import Context from '../../context'

function Header(props)
{
    const {user} = useContext(Context);

    return(
        <nav className="shadow navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Collection Service</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {user!==undefined
                ?<AuthorizedMenu user = {user}/>
                :<NotAuthorizedMenu/>
                }
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <input className="btn btn-outline-success my-2 my-sm-0" type='submit' value='Search'/>
                </form>
            </div>
        </nav>
        
    );
}

export default Header;

