import React, { useEffect } from 'react'

const divStyle = 
{
    maxWidth : '900px'
}

function ItemsList(props)
{
    const[items, setItems] = React.useState(null);

    useEffect(() =>
    {
        setItems(props.items);
    }, [props])

    return(
        <div className = "shadow d-flex flex-column align-items-center mx-auto my-5 w-100 p-4" style = {divStyle}>
            <div className = "form-group mt-4 w-100">
                <strong>Order by</strong>
                <div className="btn-group btn-group-toggle w-100" data-toggle="buttons">
                    <label className="btn btn-secondary active">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked />
                         Title
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autocomplete="off" /> 
                        Likes
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option3" autocomplete="off" /> 
                        Date
                    </label>
                </div>
            </div>
            <div className = "form-group mt-4 w-100">
                <strong>Filter by Title</strong>
                <div>
                    <input type="input" className="form-control" placeholder='Title' />
                </div>
            </div>
        </div>
    )
}

export default ItemsList;