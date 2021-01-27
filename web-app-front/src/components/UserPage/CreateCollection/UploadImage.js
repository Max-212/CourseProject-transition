import React from 'react'

function UploadImage(props)
{
    const [failed, setFailed] = React.useState(false);
    const fileInput = React.useRef(null);

    function handleDragOver(event)
    {
        event.preventDefault();
    }

    function handleOnDrop(event) 
    {
        event.preventDefault();
        setFailed(false); 
        handleFile(event.dataTransfer.files[0])
    }

    function handleFile(file)
    {
        if(!file)
        {
            setFailed(true);
            props.setImage(null);
            return;
        }
        if(file.type.split('/')[0] !== 'image')
        {
            setFailed(true);
            props.setImage(null);
        }
        else
        {
            props.setImage(file);
        }
        
    }

    return(
        <>
        <div className="drop_zone"
        onDragOver = {handleDragOver}
        onDrop = {handleOnDrop}
        onClick = { () => fileInput.current.click()}>

            <p>Click to select or Drag and drop image here....</p>
            <input 
            type="file" 
            accept='image/*'
            ref={fileInput} hidden
            onChange={e => handleFile(e.target.files[0])}
          />
        </div>
        {props.image && <span class="badge badge-pill badge-secondary">{props.image.name}</span>}
        {failed && <span class="badge badge-warning">Wrong file type!</span>}
        </>
    );
}

export default UploadImage;