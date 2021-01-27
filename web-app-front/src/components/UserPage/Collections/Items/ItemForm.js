import React, { useEffect } from 'react'
import Field from './Field';

const formStyle =
{
    maxWidth : '900px'
}

function ItemForm(props)
{
    const [title, setTitle] = React.useState('');
    const [fields, setFields] = React.useState([]);

    useEffect(() =>
    {
        if(props.title) setTitle(props.title);
        setFields(props.fields.map(field =>
        {   
            if(field.type === 0 && !field.value)
            {
                field.value = 'false';
            }
            return{
                id : field.id,
                title : field.title,
                type : field.type,
                value : field.value
            }
        })) 
        
        
    }, [props])

    function submit(event)
    {
        event.preventDefault();
        let fixedFields = fields.map(field =>
            {
                return{
                    Title : field.title,
                    Type : field.type,
                    Value : field.value
                }
            })
        let item = 
        {
            Title : title,
            Fields : fixedFields,
        }
        props.submitHandler(item);
    }

    function validateForm()
    {
        return title.length > 0 && validateFields();
    }

    function validateFields()
    {
        let flag = true;
        fields.forEach(field =>
            {
                if(!(field.value && field.value.length > 0))
                    flag = false;
            });
        return flag;
    }

    return(
        <div className='d-flex justify-content-center w-100'>
            <form className='shadow my-5 mx-3 px-5 d-flex flex-column align-items-center w-100' style = {formStyle}>
                <div className="form-group mt-4 w-100">
                    Title
                    <input type="input" className="form-control" placeholder='Title' defaultValue={props.title} 
                    onChange = {e => setTitle(e.target.value) }/>
                </div>

                {fields.map(field =>
                    {
                        return <Field key = {field.id} field = {field} fields = {fields} setFields = {setFields}/>
                    })
                }

                <div className="form-outline mt-4 mb-4">
                    <input className="btn btn-outline-success" type='submit' value='Create' disabled={!validateForm()}
                    onClick = {e => submit(e)}/>
                </div>
            </form>
        </div>
    )
}

export default ItemForm;