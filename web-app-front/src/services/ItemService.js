import axios from 'axios'
import authHeader from '../helpers/authHeader'

const API_URL = "https://tmicourseworkitransition20210120045120.azurewebsites.net/api/items";
const API_URL_HOME = "https://tmicourseworkitransition20210120045120.azurewebsites.net/api/"

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

    getItemById(id)
    {
        return axios
        .get(API_URL + `/${id}`)
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    deleteItem(id)
    {
        return axios
        .delete(API_URL + `/${id}`,
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

    updateItem(id, title, fields, collectionId)
    {
        return axios
        .put(API_URL + `/${id}`,
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

    like(id)
    {
        return axios
        .post(API_URL + `/likes/${id}`,
        {},
        { headers : authHeader() })
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            console.log(error.response)
            return error.response;
        })

    }

    getItemsByTag(tag)
    {
        return axios
        .get(API_URL + `/tags?tag=${tag}`)
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    getTags()
    {
        return axios
        .get(API_URL_HOME + 'tags')
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    addTag(itemId, tags)
    {
        return axios
        .post(API_URL + '/tags',
        {
            ItemId : itemId,
            Tags : tags
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

    deleteTag(itemId, tagId)
    {
        return axios
        .delete(API_URL + '/tags',
        {
            headers : authHeader(),
            data:
            {
                TagId : tagId,
                ItemId : itemId
            } 
        }
        )
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    getComments(itemId)
    {
        return axios
        .get(API_URL + `/comments/${itemId}`)
        .then((response) => 
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    addComment(itemId, comment)
    {
        return axios
        .post(API_URL + '/comments',
        {
            ItemId : itemId,
            Comment : comment
        },
        { headers : authHeader() })
        .then((response) =>
        {
            return response;
        }
        )
        .catch((error) =>
        {
            return error.response;
        })
    }

    searchItems(query)
    {
        return axios
        .get(API_URL + `/search?query=${query}`)
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })

    }

    getLastItems()
    {
        return axios
        .get(API_URL + '/lasts')
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