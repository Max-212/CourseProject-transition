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

function Registration(props)
{
    const [usernameError, setUsernameError] =  React.useState('');
    const [passwordError, setPasswordError] =  React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [loading , setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    function validateForm() 
    {
        return username.length > 0 && password.length > 0 && confirmPassword.length > 0
        && firstName.length && lastName.length > 0;
    }
    
    async function submitHandler(event)
    {
        event.preventDefault();
        if(checkConfirmPassword())
        {
            setLoading(true);
            setPasswordError('');
            setUsernameError('');
            let response = await AuthService.register(username, firstName, lastName, password);
            if(response.status !== 200)
            {
                setLoading(false);
                console.log(response);
                if(response.data.errors.Password)
                {
                    setUsernameError('Password : ' + response.data.errors.Password[0]);
                }
                if(response.data.errors.UserName)
                {
                    setPasswordError('Username : ' + response.data.errors.UserName[0])
                }
            }
            else
            {
                setLoading(false);
                setRedirect(true);
            }

        }
        
    }

    function checkConfirmPassword() {
        if(password !== confirmPassword)
        {
            setPasswordError('password and confirm password not matched');
            return false;
        }
        return true;
        
    }

    return(
        <div className= 'd-flex justify-content-center'>
        <div className="shadow-lg card card-container mt-5 w-100" style = {styles}>
            <form className= 'p-5' onSubmit = {submitHandler}>
                <div className="form-group mb-4">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        <input type="input" className="form-control" placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        <input type="input" className="form-control" placeholder='First Name'
                            onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        <input type="input" className="form-control" placeholder='Last Name'
                            onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group mb-4 w-100">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-lock mr-3" aria-hidden="true"></i>
                        <input type="password" className="form-control" placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group mb-4 w-100">
                    <div className='d-flex align-items-center'>
                        <i className="fa fa-lock mr-3" aria-hidden="true"></i>
                        <input type="password" className="form-control" placeholder='Confirm password'
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                </div>

                <div class="form-outline mb-4">
                    <input className="btn btn-outline-success w-100" type='submit' value='Sign up' disabled={!validateForm()}/>
                </div>

                {usernameError && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {usernameError}
                    </div>
                </div>
                )}

                {passwordError && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {passwordError}
                    </div>
                </div>
                )}

                {loading &&(
                    <Spinner/>
                )}
            </form>

        </div>
        {redirect &&(<Redirect to='/login'/>)}
        </div>
        
    );
    
}

export default Registration;