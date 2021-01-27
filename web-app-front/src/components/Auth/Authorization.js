import React, { useContext } from 'react';
import AuthService from '../../services/AuthService'
import Spinner from '../Spinner';
import Context from '../../context'
import { Redirect } from 'react-router'

const styles = 
{

    maxWidth: "500px",
    border: 'none'
}

function Authorization(props)
{
    const [message, setMessage] =  React.useState('')
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading , setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    const {setUser} = useContext(Context);

    function validateForm() 
    {
        return username.length > 0 && password.length > 0;
    }
    
    function submitHandler(event)
    {
        setMessage('');
        setLoading(true);
        event.preventDefault();
        AuthService.login(username,password).then((response) =>{
            setLoading(false);
            if(response.status !== 200)
            {
                setMessage(response.data);
            }
            else
            {
                let user =
                {
                    token : response.data.token,
                    username : response.data.user.userName
                };
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                setRedirect(true);
            }
        });
        
        

    }

    return(
        <div className= 'd-flex justify-content-center'>
        <div className="shadow-lg card card-container mt-5 w-100" style = {styles}>
            <form className= 'p-5' onSubmit = {submitHandler}>
                <div className="form-group mb-4">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        <input type="input" className="form-control" placeholder='username'
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group mb-4 w-100">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-lock mr-3" aria-hidden="true"></i>
                        <input type="password" className="form-control" placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div class="form-outline mb-4">
                    <input className="btn btn-outline-success w-100" type='submit' value='Sign in' disabled={!validateForm()}/>
                </div>

                {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
                )}

                {loading &&(
                    <Spinner/>
                )}
            </form>

        </div>
        {redirect &&(<Redirect to='/'/>)}
        </div>
        
    );
    
}

export default Authorization;