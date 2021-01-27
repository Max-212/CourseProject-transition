import React from 'react'

function Spinner()
{
    return (
        <div className='d-flex justify-content-center mt-3'>
          <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
    )

}

export default Spinner;