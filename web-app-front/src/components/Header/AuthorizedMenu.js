import React from 'react';

function AuthorizedMenu(props)
{
    function LogOut()
    {
        localStorage.removeItem("user");
    }

    return(
        <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user" aria-hidden="true"></i> {props.user.username}
                </a>
                <div className="shadow dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/userPage">Collections</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/" onClick = {LogOut}>Log Out</a>
                </div>
            </li>
        </ul>
    );

}

export default AuthorizedMenu;