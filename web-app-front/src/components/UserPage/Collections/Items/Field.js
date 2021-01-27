import React from 'react'

function Field(props)
{

    function changeValue(value)
    {
        props.setFields(props.fields.map(field =>
            {
                if(field.id === props.field.id)
                {
                    field.value = value.toString();
                } 
                return field;       
            }))
    }

    return(
        <div className="form-group mt-4 w-100">
            {props.field.title}
            
            {props.field.type === 0 &&
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" 
                    checked={props.field.value === 'true'}
                    onChange = {e => changeValue(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        {props.field.title}
                    </label>
                </div>
            }

            {props.field.type === 1 && 
                <textarea type="input" className="form-control" placeholder={props.field.title} 
                defaultValue={props.field.value}
                onChange = {e => changeValue(e.target.value)}/>
            }

            {props.field.type === 2 &&
                <input type="input" className="form-control" placeholder={props.field.title}
                defaultValue = {props.field.value}
                onChange = {e => changeValue(e.target.value)}/>
            }

            {props.field.type === 3 &&
                <input type="date" className="form-control" placeholder={props.field.title}
                defaultValue = {props.field.value}
                onChange = {e => changeValue(e.target.value)}/>
            }

            {props.field.type === 4 &&
                <input type="number" className="form-control" placeholder={props.field.title}
                defaultValue = {props.field.value}
                onChange = {e => changeValue(e.target.value)}/>
            }

        </div>
    )
}

export default Field;