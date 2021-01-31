import React, { useEffect } from 'react'
import Markdown from 'react-markdown'

function FieldsView(props)
{
    const [fields, setFields] = React.useState([]);

    useEffect(()=>
    {
        let itemFields = props.item.collection.fields.map(field =>
            {
                let itemField = props.item.fields.filter(f => f.title === field.title && f.type === field.type)[0];
                if(itemField)
                    field.value = itemField.value;
                return field;
            })
        console.log(itemFields);
        setFields(itemFields);
    },[props]);

    return(
        <>
        {fields.length > 0 && fields.map(field =>
        {
            if(field.type === 1)
            {
                return  <div>
                            <em>{field.title}</em>
                            <p className="card-text p-2"><Markdown source={field.value}/></p>
                        </div>    
            }
            if(field.type === 0)
            {
                let value;
                if(field.value === 'true') value = 'Yes'
                else value = 'No'
                return  <div>
                            <em>{field.title}:&nbsp;{value}</em>
                        </div>
            }
            else
            {
                return <div className=' p-2'>
                        <em>{field.title}<br/>{field.value}</em>
                   </div>
            }
            
        })
        }
        </>
    )
}

export default FieldsView;