import axios from "axios";

const API_URL = "https://api.cloudinary.com/v1_1/dcricklga/image/upload"

class ImageService
{
    uploadImage(image)
    {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "gglf2unk");

        return axios
        .post(API_URL, formData)
        .then((response) =>
        {
            return response.data.url;
        })
        .catch((error) =>
        {
            console.log(error.response);
        })
    }
}

export default new ImageService();