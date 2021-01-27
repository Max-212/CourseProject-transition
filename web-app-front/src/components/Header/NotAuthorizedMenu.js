import React from 'react';

function NotAuthorizedMenu(props)
{

    return(
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/login"><i className="fa fa-beer" aria-hidden="true"></i> Log In</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/register"><i className="fa fa-user" aria-hidden="true"></i> Sign Up</a>
            </li>
        </ul>
    );
    
}

export default NotAuthorizedMenu;