import React, { useEffect, useContext } from 'react'
import CollectionService from '../../../services/CollectionService';
import Context from '../../../context'
import { Redirect} from "react-router-dom";
import UploadImage from '../CreateCollection/UploadImage';
import Field from './Field'
import ImageService from '../../../services/ImageService'
import Spinner from '../../Spinner';

const styles = 
{
    maxWidth: "1000px",
    border: 'none'
}

function UpdateCollection(props)
{
    const {user} = useContext(Context);
    const [collection, setCollection] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [theme, setTheme] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [fields, setFields] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [redirect, setRedirect] = React.useState(false);

    useEffect(() =>
    {
        async function fetchData()
        {
            setLoading(true);
            let response = await CollectionService.getCollection(props.match.params.id);
            if(response.status === 200)
            {
                if(user && user.username === response.data.user.userName)
                {
                    console.log(user);
                    console.log(response.data);
                    console.log(user.userName === response.data.user.username);
                    setCollection(response.data);
                    setFields(response.data.fields);
                    setTitle(response.data.title);
                    setTheme(response.data.theme);
                    setDescription(response.data.description);
                }
                else
                {
                    setFailed(true);
                }
                setLoading(false);
            }
            else
            {
                setFailed(true);
                setLoading(false);
            }
        }
        if(!collection && !failed) fetchData();

    },[user])
    
    async function submitHandler(event)
    {
        setLoading(true);
        event.preventDefault();
        let imageUrl;
        if(!image)
        {
            imageUrl = collection.image; 
        }
        else
        {
            imageUrl = await ImageService.uploadImage(image);
        }
        

        let fixedFields = [];
        fields.forEach(field =>
            {
                fixedFields.push(
                    {
                        Title : field.title,
                        Type : field.type
                    }
                );
            });
        
        let response = await CollectionService.updateCollection(collection.id,
                theme,
                title,
                description,
                fixedFields,
                imageUrl);
        setLoading(false);
        setRedirect(true);
        
    }

    function AddField(event) 
    {
        event.preventDefault();
        setFields(
                fields.concat([
                {
                    id: Date.now(),
                    title : '',
                    type : 2
                }
            ])
        );
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

    return(
        <div className='d-flex justify-content-center m-3'>
            {redirect && <Redirect to='/userPage' />}
            {failed && (<Redirect to='/home'/>)}
            {collection &&
            (
            <form className="w-100 d-flex flex-column align-items-center" onSubmit = {e => submitHandler(e)}>    
                <div className='shadow d-flex justify-content-around w-100 flex-wrap p-5' style={styles}>
                    <div className='flex-fill d-flex flex-column align-items-center'>
                        <div className="form-group mb-4 w-100">
                            Title
                            <input type="input" className="form-control" placeholder='Title' defaultValue={collection.title} 
                            onChange = {e => setTitle(e.target.value) }/>
                        </div>

                        <div className="form-group mb-4 w-100">
                            Theme
                            <input type="input" className="form-control" placeholder='Theme' defaultValue={collection.theme}
                            onChange = {e => setTheme(e.target.value)}/>
                        </div>

                        <div className="form-group mb-4 w-100">
                            Description
                            <textarea type="input" className="form-control" placeholder='Description' defaultValue={collection.description}
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
                                return <Field key = {field.id} field ={field} fields={fields} setFields = {setFields} id = {field.id}/>
                            })
                            }
                        </div>
                </div>
                <div class="form-outline mt-4">
                    <input className="btn btn-outline-success w-100" type='submit' value='Save' disabled={!validateForm()}/>
                </div>
                {loading &&(<Spinner/>)}
            </form>
            
            )}
            
        </div>
    )
}

export default UpdateCollection;