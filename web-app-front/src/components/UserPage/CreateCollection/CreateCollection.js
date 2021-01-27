import React, {useContext} from 'react'
import Context from '../../../context'
import { Redirect } from 'react-router'
import Field from './Field'
import CollectionService from '../../../services/CollectionService'
import Spinner from '../../Spinner'
import UploadImage from './UploadImage'
import ImageService from '../../../services/ImageService'

const styles = 
{
    maxWidth: "1000px",
    border: 'none'
}

function CreateCollection(props)
{
    const {user} = useContext(Context);

    const [notAuth, setNotAuth] = React.useState(false)
    const [title, setTitle] = React.useState('');
    const [theme, setTheme] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [fields, setFields] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [image, setImage] = React.useState(null);

    function AddField(event) 
    {
        event.preventDefault();
        setFields
        (
            fields.concat([
                {
                    id: Date.now(),
                    title : '',
                    type : 2
                }
            ])
        );
    }

    async function submitHandler(event)
    {
        event.preventDefault();
        setLoading(true);

        let imageUrl = await ImageService.uploadImage(image);

        let fixedFields = [];
        fields.forEach(field =>
            {
                fixedFields.push(
                    {
                        Title : field.title,
                        Type : field.type
                    }
                );
            })

        let response = await CollectionService.addCollection(theme,title,description,fixedFields, imageUrl);
        if(response.status === 200)
        {
            setLoading(false);
            setRedirect(true);
        }
        else{
            console.log(response);
        }
    }

    function validateFields()
    {
        let flag = true;
        fields.forEach(field =>
            {
                if(field.title.length === 0)
                    flag = false;
            });
        return flag;
    }

    function validateForm() {
        return title.length > 0 && theme.length > 0 && description.length > 0 && validateFields();
    }
    
    if(!user && !notAuth) setNotAuth(true);
    return(
        
        <div className='d-flex justify-content-center m-3'>
            {notAuth && (<Redirect to='/login'/>)}
            <form className="w-100 d-flex flex-column align-items-center" onSubmit = {submitHandler}>    
                <div className='shadow d-flex justify-content-around w-100 flex-wrap p-5' style={styles}>

                    <div className='flex-fill d-flex flex-column align-items-center'>
                        <div className="form-group mb-4 w-100">
                            <input type="input" className="form-control" placeholder='Title' 
                            onChange = {e => setTitle(e.target.value) }/>
                        </div>
                        <div className="form-group mb-4 w-100">
                            <input type="input" className="form-control" placeholder='Theme'
                            onChange = {e => setTheme(e.target.value)}/>
                        </div>
                        <div className="form-group mb-4 w-100">
                            <textarea type="input" className="form-control" placeholder='Description'
                            onChange = {e => setDescription(e.target.value)}/>
                        </div>
                        <div className="form-group mb-4 w-100">
                            <UploadImage image = {image} setImage = {setImage}/>
                        </div>

                    </div>

                    <div className='flex-fill d-flex align-items-center flex-column'>
                        <div className="form-group mb-4">
                            <button className="btn btn-success" onClick = {AddField}>Add Field</button>
                        </div>
                        { fields.map(field =>
                            {
                                return <Field key = {field.id} fields ={fields} setFields = {setFields} id = {field.id}/>
                            })
                        }
                    </div>


                </div>
                <div class="form-outline mt-4">
                    <input className="btn btn-outline-success w-100" type='submit' value='Create' disabled={!validateForm()}/>
                </div>
                {loading &&(<Spinner/>)}
                {redirect &&(<Redirect to='/home'/>)}
            </form>
        </div>
    );
}

export default CreateCollection;