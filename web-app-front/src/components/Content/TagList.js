import React, { useEffect } from 'react'
import ItemService from '../../services/ItemService';
import Spinner from '../Spinner';
import Tag from './Tag';

function TagList(props)
{
    const [newTag, setNewTag] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(()=>
    {
        setTags(props.item.tags);
    },[props])

    async function addTag(event)
    {
        event.preventDefault();
        setLoading(true);
        let newTags = [];
        newTags.push(newTag);
        let response = await ItemService.addTag(props.item.id, newTags);
        if(response.status === 200)
        {
            console.log(response);
            setTags(response.data.tags);
            setNewTag('');
        }
        setLoading(false);
    }

    function validateForm()
    {
        return newTag.length > 0;
    }

    return(
        <>
        <div className = 'mw-100 d-flex flex-column align-items-center'>
        {tags.map(tag =>
            {
                return <Tag key = {tag.id} tag = {tag} itemId = {props.item.id} userPanel = {props.userPanel} setTags = {setTags}/>
            })
        }
        </div>
        
        {props.userPanel && 
        <form className = 'd-flex flex-column align-items-center mt-5'>
            <div className="form-group mb-4 w-100 text-center">
            Add Tag
            <input type="input" className="form-control" placeholder='Tag Title' value = {newTag}
            onChange = {e => setNewTag(e.target.value)}/>
            </div>
            <div className="form-group mb-4">
                <button className="btn btn-success" onClick = {e => addTag(e)} disabled = {!validateForm()}>
                    Add Tag
                    {loading && <Spinner />}
                </button>
            </div>
        </form>
        }
        </>
    )
}

export default TagList;