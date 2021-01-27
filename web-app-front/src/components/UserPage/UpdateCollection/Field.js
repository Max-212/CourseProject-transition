import React from 'react';

function Field(props)
{
    function changeTitle(title)
    {
        props.setFields(
            props.fields.map(field =>
                {
                    if(field.id === props.id)
                    {
                        field.title = title;
                    }
                    return field;
                })
        )
    }

    function changeType(type)
    {
        props.setFields(
            props.fields.map(field =>
                {
                    if(field.id === props.id)
                    {
                        field.type = Number.parseInt(type);
                    }
                    return field;
                })
        )
    }

    function deleteField(event)
    {
        event.preventDefault();
        props.setFields(
            props.fields.filter(field => field.id !== props.id)
        )
    }

    return(
        <>
            <div className="form-group mb-4 w-75">
                <input type="input" className="form-control" placeholder='Title' defaultValue ={props.field.title}
                onChange = {e =>
                {
                    changeTitle(e.target.value);
                }}/>
            </div>
            <div className="form-group mb-4 w-75">
                <select className="form-control" defaultValue={props.field.type} onChange = {e => {
                    changeType(e.target.value);
                }}>
                    <option value='0'>Checbox</option>
                    <option value='1'>Text</option>
                    <option value='2'>String</option>
                    <option value='3'>Date</option>
                    <option value='4'>Number</option>
                </select>
            </div>
            <div className="form-group mb-4 w-75">
                <button className="btn btn-danger w-100" onClick = {e =>deleteField(e)}>Delete</button>
            </div>
            <hr/>
        </>
    );
}

export default Field;