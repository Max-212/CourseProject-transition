import axios from 'axios'
import authHeader from '../helpers/authHeader'

const API_URL = "https://tmicourseworkitransition20210120045120.azurewebsites.net/api/items";

class ItemService
{
    createItem(title,fields, collectionId)
    {
        return axios
        .post(API_URL,
            {
                Title : title,
                CollectionID : collectionId,
                Fields : fields
            },
            { headers : authHeader() })
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    getItems(collectionId)
    {
        return axios
        .get(API_URL + `?collectionId=${collectionId}`)
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }
}

export default new ItemService();