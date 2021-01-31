import axios from "axios";
import authHeader from '../helpers/authHeader'

const API_URL = "https://tmicourseworkitransition20210120045120.azurewebsites.net/api/collections/";

class CollectionService
{
    addCollection(theme, title, description, fields , image)
    {
        return axios
        .post(API_URL,
            {
                Theme : theme,
                Title : title,
                Description : description,
                Fields : fields,
                Image : image
            },
            { headers : authHeader() }
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

    getLargestCollections()
    {
        return axios
        .get(API_URL)
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    getUserCollections(username)
    {
        return axios
        .get(API_URL + `user?username=${username}`)
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            console.log(error.response);
        })
    }

    getCollection(id)
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

    deleteCollection(id)
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

    updateCollection(id, theme, title, description, fields , image)
    {
        return axios
        .put(API_URL + `/${id}`,
        {
            Theme : theme,
            Title : title,
            Description : description,
            Fields : fields,
            Image : image
        },
        { headers : authHeader() }
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
}

export default new CollectionService();