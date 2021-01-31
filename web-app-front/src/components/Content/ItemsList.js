import React, { useEffect } from 'react'
import ItemPreview from './ItemPreview';

const divStyle = 
{
    maxWidth : '900px'
}

function ItemsList(props)
{
    const[items, setItems] = React.useState([]);

    useEffect(() =>
    {   
        let i = 0;
        setItems(props.items.map(item =>
        {
            item.key = i++;
            return item;
        }));
    }, [props])

    function likesHandler()
    {   if(items)
        {
            setItems(items.sort((a,b) =>
                a.likesCount < b.likesCount ? 1: -1 )
            )
            resetKeys();
        }
    }

    function titleHandler()
    {
        setItems(items.sort((a,b) =>
            a.title > b.title ? 1: -1 )
        )
        resetKeys();
    }

    function dateHandler()
    {
        setItems(items.sort((a,b) =>
            a.createdDate < b.createdDate ? 1: -1 )
        )
        resetKeys();
    }

    function filter(value)
    {
        let newItems = props.items.filter(item => item.title.startsWith(value));
        if(newItems.length > 0)
            setItems(newItems)
        else
            setItems([]);
    }

    function resetKeys()
    {
        let i = 0;
        setItems(items.map(item =>
        {
            item.key = i++;
            return item;
        })
        )
    }

    return(
        <div className = "shadow d-flex flex-column align-items-center mx-auto my-5 w-100 p-4" style = {divStyle}>
            <div className = "form-group mt-4 w-100">
                <strong>Order by</strong>
                <div className="btn-group btn-group-toggle w-100" data-toggle="buttons">
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option1" 
                        onClick = {titleHandler}/>
                         Title
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option2" value='likes' 
                        onClick = {likesHandler}/> 
                        Likes
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option3" 
                        onClick = {dateHandler}/> 
                        Date
                    </label>
                </div>
            </div>
            <div className = "form-group mt-4 w-100">
                <strong>Filter by Title</strong>
                <div>
                    <input type="input" className="form-control" placeholder='Title' 
                    onChange = {e => filter(e.target.value)}/>
                </div>
            </div>
            {items && items.map(item =>
                {
                    return <ItemPreview key = {item.key} item = {item} />
                })}
        </div>
    )
}

export default ItemsList;