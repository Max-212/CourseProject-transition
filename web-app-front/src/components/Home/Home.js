import React, {useContext, useEffect} from 'react'
import Context from '../../context'
import ItemService from '../../services/ItemService'
import TagListHome from '../Content/TagListHome'
import CollectionList from './CollectionsList'
import ItemsList from './ItemsList'

const divStyle =
{
    maxWidth : '1100px'
}

function Home(props)
{
    return(
        <div className = 'd-flex justify-content-around flex-wrap mt-5'>
            <div className = 'mw-100 d-flex flex-column flex-fill border-right p-4'>
                <div className = 'shadow rounded mw-100 d-flex flex-column align-items-center mb-4 p-2'>
                    <h3 className = 'text-center'>Largest Collections</h3>
                    <div className = 'd-flex flex-wrap justify-content-center' style = {divStyle}>
                        <CollectionList />
                    </div>
                </div>

                <div className = 'shadow rounded mw-100 d-flex flex-column align-items-center mb-4 p-2'>
                    <h3 className = 'text-center'>Last Items</h3>
                    <div className = 'd-flex flex-column align-items-center w-100 p-3' style = {divStyle}>
                        <ItemsList />
                    </div>
                </div>
                
            </div>
            <div className = 'mw-100 d-flex flex-column align-items-center p-3'>
                <h3>Popular Tags</h3>
                <TagListHome />
            </div>
        </div>
    );
}

export default Home;

