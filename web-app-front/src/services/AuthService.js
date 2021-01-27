import axios from "axios";

const API_URL = "https://tmicourseworkitransition20210120045120.azurewebsites.net/api/auth/";

class AuthService
{
    login(username,password)
    {
        return axios
        .post(API_URL + 'token',
            {
                UserName : username,
                Password : password
            })
        .then((response) =>
        {
            return response;
        })
        .catch((error) =>
        {
            return error.response;
        })
    }

    register(username,firstName,lastName,password)
    {
        return axios
        .post(API_URL,
            {
                UserName : username,
                Password : password,
                FirstName : firstName,
                LastName : lastName
            })
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

export default new AuthService();